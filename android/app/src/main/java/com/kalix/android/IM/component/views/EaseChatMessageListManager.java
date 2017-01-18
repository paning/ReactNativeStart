package com.kalix.android.IM.component.views;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.easeui.widget.EaseChatMessageList;

/**
 * 聊天消息列表控件
 *
 */
public class EaseChatMessageListManager extends SimpleViewManager<EaseChatMessageList> {

    private static final String REACT_CLASS= "EaseChatMessageList";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseChatMessageList createViewInstance(ThemedReactContext reactContext) {
        return new EaseChatMessageList(reactContext);
    }
}
