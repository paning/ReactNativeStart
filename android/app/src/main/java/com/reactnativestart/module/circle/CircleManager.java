package com.reactnativestart.module.circle;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageManager;
import com.facebook.react.views.image.ReactImageView;

/**
 * Created by Administrator on 2017/1/5.
 */
public class CircleManager extends SimpleViewManager<CircleView> {
    @Override
    public String getName() {
        return "MCircle";
    }

    @Override
    public CircleView createViewInstance(ThemedReactContext reactContext) {
        return new CircleView(reactContext);
    }

    @ReactProp(name = "url")
    public void setUrl(CircleView view, @Nullable String url) {
        Log.e("setUrl", url);
    }

    @ReactProp(name = "x")
    public void setX(CircleView view, float x) {
        view.setX(x);
    }

    @ReactProp(name = "y")
    public void setY(CircleView view, float y) {
        view.setY(y);
    }

    @ReactProp(name = "radius")
    public void setRadius(CircleView view, float radius) {
        view.setRadius(radius);
    }
}
