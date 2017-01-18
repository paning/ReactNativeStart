package com.kalix.android.IM.component.views;

import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.hyphenate.easeui.widget.EaseTitleBar;

/**
 * 标题栏
 *
 */
public class EaseTitleBarManager extends ViewGroupManager<EaseTitleBar> {

    protected static final String TAG = "EaseTitleBarManager";
    private static final String REACT_CLASS= "EaseTitleBar";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected EaseTitleBar createViewInstance(ThemedReactContext reactContext) {
        return new EaseTitleBar(reactContext);
    }

    @ReactProp(name = "title")
    public void setTitle(EaseTitleBar view, @Nullable String title) {
        view.setTitle(title);
        Log.d(TAG, "EaseTitleBar.setTitle");
    }
}
