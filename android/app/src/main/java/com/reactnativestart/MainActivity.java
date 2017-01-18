package com.reactnativestart;

import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.views.image.ReactImageView;
import com.kalix.android.IM.ui.NewMainActivity;
import com.kalix.android.IM.ui.VideoCallActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeStart";
    }

    public void callNewMainActivity() {
        Intent intent = new Intent(this, NewMainActivity.class);
        startActivity(intent);
    }

    public void callVideoActivity(String toChatUsername) {
        Intent intent = new Intent(this, VideoCallActivity.class);
        intent.putExtra("username", toChatUsername).putExtra("isComingCall", false);
        startActivity(intent);
        finish();
    }

    public void onBackPressed() {
        super.onBackPressed();
    }
}
