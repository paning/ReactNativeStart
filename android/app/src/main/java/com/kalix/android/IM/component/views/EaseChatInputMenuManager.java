package com.kalix.android.IM.component.views;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.easeui.widget.EaseChatInputMenu;

/**
 * 聊天输入菜单栏
 *
 */
public class EaseChatInputMenuManager extends SimpleViewManager<EaseChatInputMenu> {

    private static final String REACT_CLASS= "EaseChatInputMenu";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseChatInputMenu createViewInstance(ThemedReactContext reactContext) {
        return new EaseChatInputMenu(reactContext);
    }
}
