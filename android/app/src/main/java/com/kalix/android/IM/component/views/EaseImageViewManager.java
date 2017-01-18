package com.kalix.android.IM.component.views;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.easeui.widget.EaseImageView;

/**
 * 自定义的ImageView，支持设置ImageView形状、倒角大小等
 *
 */
public class EaseImageViewManager extends SimpleViewManager<EaseImageView> {

    private static final String REACT_CLASS= "EaseImageView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseImageView createViewInstance(ThemedReactContext reactContext) {
        return new EaseImageView(reactContext);
    }
}
