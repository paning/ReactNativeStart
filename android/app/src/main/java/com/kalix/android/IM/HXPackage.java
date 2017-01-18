package com.kalix.android.IM;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.kalix.android.IM.component.views.EaseChatInputMenuManager;
import com.kalix.android.IM.component.views.EaseChatMessageListManager;
import com.kalix.android.IM.component.views.EaseContactListManager;
import com.kalix.android.IM.component.views.EaseConversationListManager;
import com.kalix.android.IM.component.views.EaseImageViewManager;
import com.kalix.android.IM.component.views.EaseTitleBarManager;
import com.kalix.android.IM.module.HXModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/1/12.
 */
public class HXPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {

        List<NativeModule> modules = new ArrayList<>();
        modules.add(new HXModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new EaseTitleBarManager(),
                new EaseChatMessageListManager(),
                new EaseChatInputMenuManager(),
                new EaseConversationListManager(),
                new EaseContactListManager(),
                new EaseImageViewManager()
        );
    }
}
