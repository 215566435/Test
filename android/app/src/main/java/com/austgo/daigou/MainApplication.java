package com.austgo.daigou;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cn.jiguang.share.reactnative.JSharePackage;
// import cn.jiguang.share.reactnative.JSharePackage; // 极光推送
import com.beefe.picker.PickerViewPackage;
import com.rnfs.RNFSPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
// import cn.jiguang.share.JSharePackage; //generateing apk problem 程序包cn.jiguang.share不存在
import com.kmlidc.RNShareLocal.RNShareLocal;
// import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.theweflex.react.WeChatPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new JSharePackage(),
            new PickerViewPackage(),
            new WeChatPackage(),
            new RNFSPackage(),
            new CookieManagerPackage(),
            //new JSharePackage(), //generateing apk problem 程序包cn.jiguang.share不存在
            new RNShareLocal(), 
            //new SplashScreenReactPackage(), // check after npm run link
            new CodePush("IO-yMj-XqW6ZFzNDlNW7xuQpVOSb9753d84a-48fc-4420-83eb-7d61a334bad6", getApplicationContext(), BuildConfig.DEBUG), 
            new VectorIconsPackage(),
            new WeChatPackage()  // Add this line
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
