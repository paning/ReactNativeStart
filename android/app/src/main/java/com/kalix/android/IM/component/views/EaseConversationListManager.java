package com.kalix.android.IM.component.views;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.easeui.widget.EaseConversationList;

/**
 * 会话列表控件
 *
 */
public class EaseConversationListManager extends SimpleViewManager<EaseConversationList> {

    private static final String REACT_CLASS= "EaseConversationList";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseConversationList createViewInstance(ThemedReactContext reactContext) {
        return new EaseConversationList(reactContext, null);
    }
}
