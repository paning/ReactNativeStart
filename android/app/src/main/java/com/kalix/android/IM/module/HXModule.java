package com.kalix.android.IM.module;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.easemob.redpacketsdk.RedPacket;
import com.easemob.redpacketsdk.constant.RPConstant;
import com.easemob.redpacketui.utils.RedPacketUtil;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hyphenate.EMCallBack;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMConversation;
import com.hyphenate.easeui.domain.EaseUser;
import com.hyphenate.easeui.utils.EaseCommonUtils;
import com.hyphenate.util.EasyUtils;
import com.kalix.android.IM.DemoHelper;
import com.kalix.android.IM.db.DemoDBManager;
import com.kalix.android.IM.ui.VideoCallActivity;
import com.kalix.android.IM.ui.VoiceCallActivity;
import com.reactnativestart.MainActivity;
import com.reactnativestart.R;

import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/1/12.
 */
public class HXModule extends ReactContextBaseJavaModule {

    protected static final String TAG = "HXModule";
    private static final String MODULE_NAME= "HXModule";

    public static ReactApplicationContext mContext;
    private static HXModule instance;

    /**
     * nickname for current user, the nickname instead of ID be shown when user receive notification from APNs
     */
    public static String currentUserNick = "";

    private static final int sleepTime = 2000;
    private boolean progressShow;

    /*
    * 联系人
    * */
    protected List<EaseUser> contactList;
    private Map<String, EaseUser> contactsMap;

    public HXModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        instance = this;
    }

    public static HXModule getInstance() {
        return instance;
    }

    public Context getContext() {
        return mContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void initHXSDK() {
        //MultiDex.install(mContext);

        //init demo helper
        DemoHelper.getInstance().init(mContext);
        //red packet code : 初始化红包上下文，开启日志输出开关
        RedPacket.getInstance().initContext(mContext);
        RedPacket.getInstance().setDebugMode(true);
        //end of red packet code
    }

    /*------------------------SplashActivity-------------------------*/

    /**
     * get sdk version
     */
    @ReactMethod
    public void getVersion(final Callback callback) {
        callback.invoke(EMClient.getInstance().VERSION);
    }

    @ReactMethod
    public void onStart(final Callback mainCallback, final Callback loginCallback) {

        new Thread(new Runnable() {
            public void run() {
                if (DemoHelper.getInstance().isLoggedIn()) {
                    // auto login mode, make sure all group and conversation is loaed before enter the main screen
                    long start = System.currentTimeMillis();
                    EMClient.getInstance().chatManager().loadAllConversations();
                    EMClient.getInstance().groupManager().loadAllGroups();
                    long costTime = System.currentTimeMillis() - start;
                    //wait
                    if (sleepTime - costTime > 0) {
                        try {
                            Thread.sleep(sleepTime - costTime);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    String topActivityName = EasyUtils.getTopActivityName(EMClient.getInstance().getContext());
                    if (topActivityName != null && (topActivityName.equals(VideoCallActivity.class.getName()) || topActivityName.equals(VoiceCallActivity.class.getName()))) {
                        // nop
                        // avoid main screen overlap Calling Activity
                    } else {
                        //enter main screen
                        //startActivity(new Intent(SplashActivity.this, MainActivity.class));
                        //finish();
                        mainCallback.invoke();
                    }
                }
                else {
                    try {
                        Thread.sleep(sleepTime);
                    }
                    catch (InterruptedException e) {
                    }
                    //startActivity(new Intent(SplashActivity.this, LoginActivity.class));
                    //finish();
                    loginCallback.invoke();
                }
            }
        }).start();

    }

    /*------------------------LoginActivity-------------------------*/

    @ReactMethod
    public void isLoggedIn(final Callback callback) {
        callback.invoke(DemoHelper.getInstance().isLoggedIn());
    }

    @ReactMethod
    public void getCurrentUsernName(final Callback callback) {
        callback.invoke(DemoHelper.getInstance().getCurrentUsernName());
    }

    @ReactMethod
    public void login(String uname, String password,
                      final Callback successCallback, final Callback errorCallback) {

        if (!EaseCommonUtils.isNetWorkConnected(mContext)) {
            errorCallback.invoke(R.string.network_isnot_available);
            return;
        }

        if (TextUtils.isEmpty(uname)) {
            errorCallback.invoke(R.string.User_name_cannot_be_empty);
            return;
        }
        if (TextUtils.isEmpty(password)) {
            errorCallback.invoke(R.string.Password_cannot_be_empty);
            return;
        }

        /*progressShow = true;
            final ProgressDialog pd = new ProgressDialog(mContext);
            pd.setCanceledOnTouchOutside(false);
            pd.setOnCancelListener(new DialogInterface.OnCancelListener() {

                @Override
                public void onCancel(DialogInterface dialog) {
                Log.d(TAG, "EMClient.getInstance().onCancel");
                progressShow = false;
            }
        });
        pd.setMessage(mContext.getString(R.string.Is_landing));
        pd.show();*/

        // After logout，the DemoDB may still be accessed due to async callback, so the DemoDB will be re-opened again.
        // close it before login to make sure DemoDB not overlap
        DemoDBManager.getInstance().closeDB();

        // reset current user name before login
        DemoHelper.getInstance().setCurrentUserName(uname);

        final long start = System.currentTimeMillis();
        // call login method
        Log.d(TAG, "EMClient.getInstance().login");
        EMClient.getInstance().login(uname, password, new EMCallBack() {

            @Override
            public void onSuccess() {

                Log.d(TAG, "login: onSuccess");

                // ** manually load all local groups and conversation
                EMClient.getInstance().groupManager().loadAllGroups();
                EMClient.getInstance().chatManager().loadAllConversations();

                // update current user's display name for APNs
                boolean updatenick = EMClient.getInstance().pushManager().updatePushNickname(
                        currentUserNick.trim());
                if (!updatenick) {
                    Log.e("LoginActivity", "update current user nick fail");
                }

                /*if (!LoginActivity.this.isFinishing() && pd.isShowing()) {
                    pd.dismiss();
                }*/
                // get user's info (this should be get from App's server or 3rd party service)
                DemoHelper.getInstance().getUserProfileManager().asyncGetCurrentUserInfo();

                /*Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
                finish();*/
                successCallback.invoke();
            }

            @Override
            public void onProgress(int progress, String status) {
                Log.d(TAG, "login: onProgress");
            }

            @Override
            public void onError(int code, String error) {
                Log.d(TAG, "login: onError: " + code);
                /*if (!progressShow) {
                    return;
                }
                runOnUiThread(new Runnable() {
					public void run() {
						pd.dismiss();
						Toast.makeText(getApplicationContext(), getString(R.string.Login_failed) + message,
								Toast.LENGTH_SHORT).show();
					}
				});*/
                errorCallback.invoke(error);
            }
        });
    }

    @ReactMethod
    public void logout(final Callback successCallback, final Callback errorCallback) {

        /*final ProgressDialog pd = new ProgressDialog(getActivity());
        String st = getResources().getString(R.string.Are_logged_out);
        pd.setMessage(st);
        pd.setCanceledOnTouchOutside(false);
        pd.show();*/

        DemoHelper.getInstance().logout(false, new EMCallBack() {

            @Override
            public void onSuccess() {
                /*getActivity().runOnUiThread(new Runnable() {
                    public void run() {
                        pd.dismiss();
                        // show login screen
                        ((MainActivity) getActivity()).finish();
                        startActivity(new Intent(getActivity(), LoginActivity.class));

                    }
                });*/
                successCallback.invoke();
            }

            @Override
            public void onProgress(int progress, String status) {
            }

            @Override
            public void onError(int code, String message) {
                /*getActivity().runOnUiThread(new Runnable() {

                    @Override
                    public void run() {
                        // TODO Auto-generated method stub
                        pd.dismiss();
                        Toast.makeText(getActivity(), "unbind devicetokens failed", Toast.LENGTH_SHORT).show();
                    }
                });*/
                errorCallback.invoke(message);
            }
        });
    }

    /*------------------------NewMainActivity-------------------------*/
    @ReactMethod
    public void startNewMainActivity(final Callback errorCallback) {
        if (!EMClient.getInstance().isConnected()) {
            errorCallback.invoke(R.string.not_connect_to_server);
        }
        else {
            MainActivity activity = (MainActivity) getCurrentActivity();
            activity.callNewMainActivity();
        }
    }

    /**
     * 联系人
     * get contact list and sort, will filter out users in blacklist
     */
    protected void getContactList() {
        contactList.clear();
        if(contactsMap == null){
            return;
        }
        synchronized (this.contactsMap) {
            Iterator<Map.Entry<String, EaseUser>> iterator = contactsMap.entrySet().iterator();
            List<String> blackList = EMClient.getInstance().contactManager().getBlackListUsernames();
            while (iterator.hasNext()) {
                Map.Entry<String, EaseUser> entry = iterator.next();
                // to make it compatible with data in previous version, you can remove this check if this is new app
                if (!entry.getKey().equals("item_new_friends")
                        && !entry.getKey().equals("item_groups")
                        && !entry.getKey().equals("item_chatroom")
                        && !entry.getKey().equals("item_robots")){
                    if(!blackList.contains(entry.getKey())){
                        //filter out users in blacklist
                        EaseUser user = entry.getValue();
                        EaseCommonUtils.setUserInitialLetter(user);
                        contactList.add(user);
                    }
                }
            }
        }

        // sorting
        Collections.sort(contactList, new Comparator<EaseUser>() {

            @Override
            public int compare(EaseUser lhs, EaseUser rhs) {
                if(lhs.getInitialLetter().equals(rhs.getInitialLetter())){
                    return lhs.getNick().compareTo(rhs.getNick());
                }else{
                    if("#".equals(lhs.getInitialLetter())){
                        return 1;
                    }else if("#".equals(rhs.getInitialLetter())){
                        return -1;
                    }
                    return lhs.getInitialLetter().compareTo(rhs.getInitialLetter());
                }
            }
        });
    }

    /*------------------------chat call-------------------------*/
    //@ReactMethod
    public void startChatActivity(final Callback errorCallback) {
        /*if (!EMClient.getInstance().isConnected())
            //Toast.makeText(getActivity(), R.string.not_connect_to_server, Toast.LENGTH_SHORT).show();
            errorCallback.invoke(R.string.not_connect_to_server);
        else {
            MainActivity activity = (MainActivity) getCurrentActivity();
            activity.callChat();
        }*/
    }

    /*------------------------video call-------------------------*/
    /**
     * make a video call
     */
    //@ReactMethod
    public void startVideoActivity(String toChatUsername, final Callback errorCallback) {
        if (!EMClient.getInstance().isConnected())
            errorCallback.invoke(R.string.not_connect_to_server);
        else {
            /*startActivity(new Intent(getActivity(), VideoCallActivity.class).putExtra("username", toChatUsername)
                    .putExtra("isComingCall", false));
            // videoCallBtn.setEnabled(false);
            inputMenu.hideExtendMenuContainer();*/
            MainActivity activity = (MainActivity) getCurrentActivity();
            activity.callVideoActivity(toChatUsername);
        }
    }
}
