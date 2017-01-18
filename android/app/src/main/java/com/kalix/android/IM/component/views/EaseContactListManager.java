package com.kalix.android.IM.component.views;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.easeui.domain.EaseUser;
import com.hyphenate.easeui.widget.EaseContactList;

import java.util.ArrayList;
import java.util.List;

/**
 * 联系人列表页面
 *
 */
public class EaseContactListManager extends SimpleViewManager<EaseContactList> {

    private static final String REACT_CLASS= "EaseContactList";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseContactList createViewInstance(ThemedReactContext reactContext) {
        //return new EaseContactList(reactContext);
        List<EaseUser> contactList = new ArrayList<>();
        for(int i = 1; i <= 10; i++){
            EaseUser user = new EaseUser("easeuitest" + i);
            contactList.add(user);
        }
        EaseContactList easeContactList = new EaseContactList(reactContext);
        easeContactList.init(contactList);
        return  easeContactList;
    }
}
