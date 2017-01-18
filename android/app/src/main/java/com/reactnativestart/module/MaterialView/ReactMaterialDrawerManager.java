package com.reactnativestart.module.MaterialView;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by Administrator on 2017/1/14.
 */
public class ReactMaterialDrawerManager extends SimpleViewManager<ReactMaterialView> {
    //定义名字，必须的部分
    public static final String RTCNAME="RCTMaterialView";
    //getName方法返回的名字会用于在JavaScript端引用这个原生视图类型
    @Override
    public String getName() {
        return RTCNAME;
    }
    //实现方法createViewInstance，用来生成上面的自定义view的对象
    @Override
    protected ReactMaterialView createViewInstance(ThemedReactContext reactContext) {
        return new ReactMaterialView(reactContext);
    }
    // 通过@ReactProp（或@ReactPropGroup）注解来导出属性的设置方法
    @ReactProp(name = "titleText")
    public void setmTitleText(ReactMaterialView view,  @Nullable String titleText) {
        Log.i("ViewManager","settitleText");
        view.setmTitleText(titleText);
    }

    @ReactProp(name = "titleTextColor")
    public void setmTitleTextColor(ReactMaterialView view, @Nullable String titleTextColor) {
        Log.i("ViewManager","settitleTextColor");
        view.setmTitleTextColor(titleTextColor);
    }

    @ReactProp(name = "titleTextSize")
    public void setmTitleTextSize(ReactMaterialView view, int titleTextSize) {
        Log.i("ViewManager","setTextSize");
        view.setmTitleTextSize(titleTextSize);
    }
}
