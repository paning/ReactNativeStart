import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native';

export default class TestListView extends Component {
  constructor(props) {
    super(props);
  };

  openDrawer() {
      this.drawer.openDrawer();
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text>abc</Text>
      </View>
    );


    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => navigationView}
        >
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <View style = {{
          backgroundColor: '#f4ec34',
          height:54,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingLeft: 20,
          paddingRight:20,
        }}>
          <TouchableOpacity onPress={this.openDrawer}>
            <Image  source={require('../image/logo.png')} style={{  width: 20, height: 20}} />
         </TouchableOpacity>
          <Text style={{ fontSize:18,  color:'#484848' }}>SHOP</Text>
          <Image  source={require('../image/logo.png')} style={{  width: 20, height: 20}} />
        </View>
        <Image source= {{ uri: 'http://img.hb.aicdn.com/cbf3ebcae08ef62ef02dd61aa2407414dc64e794150313-KRUD1s_fw658' }}
          style={{ height: 220, margin: 20}}  />
        <Text style={{ fontSize:16,  color:'#484848', alignSelf:'center' }}>HOT PRODUCTS</Text>
        <View style={ styles.photoRow }>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1YQAPKVXXXXa9XFXXwu0bFXXX.png_270x270Q90.jpg' }}
            style={ styles.photoItem }  />
            <Text style={styles.photoName }>TEL ORGES</Text>
            <Text style={styles.photoPrice }>$99</Text>
            <TouchableOpacity onPress={this.openDrawer.bind()}>
              <Image  source={require('../image/logo.png')} style={{  width: 20, height: 20}} />
           </TouchableOpacity>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1DteFKVXXXXXQapXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={  styles.photoItem  }  />
            <Text style={styles.photoName}>ARFL JUYHS</Text>
            <Text style={styles.photoPrice }>$34.2</Text>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1dQGTKVXXXXaaXVXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>TKLL ORGES</Text>
            <Text style={styles.photoPrice }>$182</Text>
          </View>
        </View>
        <Text style={{ fontSize:16,  color:'#484848',  alignSelf:'center' , marginTop:20 }}>NEW COLLECTIONS</Text>
        <View style={ styles.photoRow }>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1rzGNKVXXXXbGXVXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>TEL ORGES</Text>
            <Text style={styles.photoPrice }>$99</Text>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1rzGNKVXXXXbGXVXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>ARFL JUYHS</Text>
            <Text style={styles.photoPrice }>$34.2</Text>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1uBUxKVXXXXcGXpXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>TKLL ORGES</Text>
            <Text style={styles.photoPrice }>$182</Text>
          </View>
        </View>
        <Text style={{ fontSize:16,  color:'#484848',  alignSelf:'center' , marginTop:20 }}>MOST POP</Text>
        <View style={ styles.photoRow }>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1Rqa3KVXXXXb6XpXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>TEL ORGES</Text>
            <Text style={styles.photoPrice }>$99</Text>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1Rqa3KVXXXXb6XpXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>ARFL JUYHS</Text>
            <Text style={styles.photoPrice }>$34.2</Text>
          </View>
          <View>
          <Image source= {{ uri: 'https://gw.alicdn.com/bao/uploaded/TB1lMksKVXXXXa7XpXXSutbFXXX.jpg_270x270Q90.jpg' }}
            style={ styles.photoItem  }  />
            <Text style={styles.photoName}>TKLL ORGES</Text>
            <Text style={styles.photoPrice }>$182</Text>
          </View>
        </View>
      </View>
      </ScrollView>
     </DrawerLayoutAndroid>

    );
  }
};

var styles = StyleSheet.create({
 contentContainer: {
 },
 listItem:{

 },
 photoRow:{
   flexDirection:'row',
   justifyContent: 'space-between',
   paddingLeft: 20,
   paddingRight: 20,
   marginTop:10,
 },
 photoItem:{
   height: 120,
   width:90 ,
   alignItems: 'stretch' ,
   alignSelf:'center'
 },
 photoName:{
   fontSize:14,
   color:'#f39d7f',
   alignSelf:'center',
 },
 photoPrice:{
   fontSize:12,  color:'#484848', alignSelf:'center'
 },

});
