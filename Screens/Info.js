import React from 'react'
import { Animated, Dimensions, Text, View, Button, StatusBar, StyleSheet, Image, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import Svg, { Mask, Path } from "react-native-svg"


var { width, height } = Dimensions.get("window");
const MARGIN = 27;
const VARIATION = 150;
const CARD_HEIGHT = height - MARGIN - VARIATION;

var developers = [
  {
    imageURI: "https://phoenixcreation2.herokuapp.com/static/logomain.png",
    name: "Het Patel",
    description: "Also goes as a Phoenix. A full stack developer. Master in copying items like this. A good person, maybe. depends on your point of view.",
    tagline: "Never annoy someone. You never know who is backing up them.",
  },
  {
    imageURI: "https://phoenixcreation2.herokuapp.com/static/image/p5js/3.jpg",
    name: "Gaurav Patel",
    description: "A master in finding problems related to privacy and security. Security expert for this app. A person with different vision then whole world.",
    tagline: "Your worse is mine best and your data is also mine! 😜 🤣  ",
  },
]
developers.push(developers[1])

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const DeveloperSVG = () => {
  return (
    <Svg
      width={294}
      height={62}
      viewBox="0 0 294 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0.951}
        y={0}
        width={293}
        height={62}
        fill="#000"
      >
        <Path fill="#fff" d="M.951 0h293v62h-293z" />
        <Path d="M2.951 47V4.344h12.041c3.711 0 6.992.82 9.844 2.46 2.852 1.641 5.049 3.975 6.592 7.003 1.562 3.027 2.353 6.504 2.373 10.43v2.724c0 4.023-.782 7.549-2.344 10.576-1.543 3.028-3.76 5.352-6.65 6.973-2.871 1.62-6.221 2.45-10.05 2.49H2.952zM8.576 8.973V42.4h5.918c4.336 0 7.705-1.347 10.108-4.043 2.421-2.695 3.632-6.533 3.632-11.513v-2.49c0-4.844-1.142-8.604-3.427-11.28-2.266-2.695-5.489-4.062-9.668-4.101H8.576zm46.055 38.613c-4.297 0-7.793-1.406-10.488-4.219-2.696-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.595-5.947 1.787-8.408 1.21-2.48 2.89-4.414 5.039-5.8 2.168-1.407 4.511-2.11 7.031-2.11 4.121 0 7.324 1.357 9.61 4.072 2.285 2.715 3.427 6.602 3.427 11.66v2.256H45.52c.078 3.125.986 5.654 2.724 7.588 1.758 1.914 3.984 2.871 6.68 2.871 1.914 0 3.535-.39 4.863-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.656 4.082-6.64 6.123-11.953 6.123zm-.674-28.418c-2.188 0-4.023.8-5.508 2.402-1.484 1.582-2.402 3.809-2.754 6.68h15.88v-.41c-.157-2.754-.9-4.883-2.227-6.387-1.328-1.523-3.125-2.285-5.391-2.285zm29.385 20.479L91.193 15.3h5.538L85.363 47h-4.13L69.747 15.3h5.537l8.057 24.347zm31.347 7.939c-4.296 0-7.793-1.406-10.488-4.219-2.695-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.596-5.947 1.787-8.408 1.211-2.48 2.891-4.414 5.039-5.8 2.168-1.407 4.512-2.11 7.032-2.11 4.121 0 7.324 1.357 9.609 4.072s3.428 6.602 3.428 11.66v2.256h-21.475c.078 3.125.986 5.654 2.725 7.588 1.758 1.914 3.984 2.871 6.679 2.871 1.914 0 3.536-.39 4.864-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.657 4.082-6.641 6.123-11.954 6.123zm-.673-28.418c-2.188 0-4.024.8-5.508 2.402-1.485 1.582-2.403 3.809-2.754 6.68h15.879v-.41c-.156-2.754-.899-4.883-2.227-6.387-1.328-1.523-3.125-2.285-5.39-2.285zM139.24 47h-5.42V2h5.42v45zm7.266-16.143c0-3.105.605-5.898 1.816-8.378 1.231-2.481 2.93-4.395 5.098-5.743 2.187-1.347 4.678-2.021 7.471-2.021 4.316 0 7.802 1.494 10.459 4.482 2.675 2.989 4.013 6.963 4.013 11.924v.381c0 3.086-.595 5.86-1.787 8.32-1.172 2.442-2.861 4.346-5.068 5.713-2.188 1.367-4.707 2.05-7.559 2.05-4.297 0-7.783-1.493-10.459-4.482-2.656-2.988-3.984-6.943-3.984-11.865v-.38zm5.449.645c0 3.516.811 6.338 2.432 8.467 1.64 2.129 3.828 3.193 6.562 3.193 2.754 0 4.942-1.074 6.563-3.222 1.621-2.168 2.431-5.196 2.431-9.083 0-3.476-.83-6.289-2.49-8.437-1.641-2.168-3.828-3.252-6.562-3.252-2.676 0-4.834 1.064-6.475 3.193-1.641 2.13-2.461 5.176-2.461 9.141zm56.983 0c0 4.824-1.104 8.71-3.311 11.66-2.207 2.95-5.195 4.424-8.965 4.424-3.848 0-6.875-1.22-9.082-3.662v15.264h-5.42V15.3h4.951l.264 3.515c2.207-2.734 5.273-4.101 9.199-4.101 3.809 0 6.817 1.435 9.024 4.306 2.226 2.872 3.34 6.866 3.34 11.983v.498zm-5.42-.615c0-3.575-.762-6.397-2.286-8.467-1.523-2.07-3.613-3.106-6.269-3.106-3.281 0-5.742 1.456-7.383 4.366v15.146c1.621 2.89 4.102 4.336 7.441 4.336 2.598 0 4.659-1.025 6.182-3.076 1.543-2.07 2.315-5.137 2.315-9.2zm25.488 16.699c-4.297 0-7.793-1.406-10.488-4.219-2.696-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.595-5.947 1.787-8.408 1.211-2.48 2.89-4.414 5.039-5.8 2.168-1.407 4.511-2.11 7.031-2.11 4.121 0 7.324 1.357 9.609 4.072 2.286 2.715 3.428 6.602 3.428 11.66v2.256h-21.474c.078 3.125.986 5.654 2.724 7.588 1.758 1.914 3.985 2.871 6.68 2.871 1.914 0 3.535-.39 4.863-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.656 4.082-6.641 6.123-11.953 6.123zm-.674-28.418c-2.187 0-4.023.8-5.508 2.402-1.484 1.582-2.402 3.809-2.754 6.68h15.879v-.41c-.156-2.754-.898-4.883-2.226-6.387-1.328-1.523-3.125-2.285-5.391-2.285zm34.658.996a16.23 16.23 0 00-2.666-.205c-3.554 0-5.967 1.514-7.236 4.541V47h-5.42V15.3h5.273l.088 3.663c1.778-2.832 4.297-4.248 7.559-4.248 1.055 0 1.855.137 2.402.41v5.04zm23.467 18.428c0-1.465-.557-2.598-1.67-3.399-1.094-.82-3.017-1.523-5.771-2.109-2.735-.586-4.912-1.29-6.534-2.11-1.601-.82-2.793-1.796-3.574-2.93-.762-1.132-1.142-2.48-1.142-4.042 0-2.598 1.093-4.795 3.281-6.592 2.207-1.797 5.019-2.695 8.437-2.695 3.594 0 6.504.928 8.731 2.783 2.246 1.855 3.369 4.229 3.369 7.12h-5.449c0-1.485-.635-2.764-1.905-3.839-1.25-1.074-2.832-1.611-4.746-1.611-1.972 0-3.515.43-4.629 1.289-1.113.86-1.669 1.982-1.669 3.37 0 1.308.517 2.294 1.552 2.958 1.035.664 2.901 1.299 5.596 1.904 2.715.606 4.912 1.329 6.592 2.168 1.679.84 2.92 1.856 3.72 3.047.821 1.172 1.231 2.608 1.231 4.307 0 2.832-1.133 5.107-3.398 6.826-2.266 1.7-5.206 2.549-8.819 2.549-2.539 0-4.785-.45-6.738-1.348-1.953-.898-3.486-2.148-4.6-3.75-1.093-1.62-1.64-3.369-1.64-5.244h5.42c.097 1.816.82 3.262 2.168 4.336 1.367 1.055 3.164 1.582 5.39 1.582 2.051 0 3.692-.41 4.922-1.23 1.25-.84 1.875-1.954 1.875-3.34z" />
      </Mask>
      <Path
        d="M2.951 47V4.344h12.041c3.711 0 6.992.82 9.844 2.46 2.852 1.641 5.049 3.975 6.592 7.003 1.562 3.027 2.353 6.504 2.373 10.43v2.724c0 4.023-.782 7.549-2.344 10.576-1.543 3.028-3.76 5.352-6.65 6.973-2.871 1.62-6.221 2.45-10.05 2.49H2.952zM8.576 8.973V42.4h5.918c4.336 0 7.705-1.347 10.108-4.043 2.421-2.695 3.632-6.533 3.632-11.513v-2.49c0-4.844-1.142-8.604-3.427-11.28-2.266-2.695-5.489-4.062-9.668-4.101H8.576zm46.055 38.613c-4.297 0-7.793-1.406-10.488-4.219-2.696-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.595-5.947 1.787-8.408 1.21-2.48 2.89-4.414 5.039-5.8 2.168-1.407 4.511-2.11 7.031-2.11 4.121 0 7.324 1.357 9.61 4.072 2.285 2.715 3.427 6.602 3.427 11.66v2.256H45.52c.078 3.125.986 5.654 2.724 7.588 1.758 1.914 3.984 2.871 6.68 2.871 1.914 0 3.535-.39 4.863-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.656 4.082-6.64 6.123-11.953 6.123zm-.674-28.418c-2.188 0-4.023.8-5.508 2.402-1.484 1.582-2.402 3.809-2.754 6.68h15.88v-.41c-.157-2.754-.9-4.883-2.227-6.387-1.328-1.523-3.125-2.285-5.391-2.285zm29.385 20.479L91.193 15.3h5.538L85.363 47h-4.13L69.747 15.3h5.537l8.057 24.347zm31.347 7.939c-4.296 0-7.793-1.406-10.488-4.219-2.695-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.596-5.947 1.787-8.408 1.211-2.48 2.891-4.414 5.039-5.8 2.168-1.407 4.512-2.11 7.032-2.11 4.121 0 7.324 1.357 9.609 4.072s3.428 6.602 3.428 11.66v2.256h-21.475c.078 3.125.986 5.654 2.725 7.588 1.758 1.914 3.984 2.871 6.679 2.871 1.914 0 3.536-.39 4.864-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.657 4.082-6.641 6.123-11.954 6.123zm-.673-28.418c-2.188 0-4.024.8-5.508 2.402-1.485 1.582-2.403 3.809-2.754 6.68h15.879v-.41c-.156-2.754-.899-4.883-2.227-6.387-1.328-1.523-3.125-2.285-5.39-2.285zM139.24 47h-5.42V2h5.42v45zm7.266-16.143c0-3.105.605-5.898 1.816-8.378 1.231-2.481 2.93-4.395 5.098-5.743 2.187-1.347 4.678-2.021 7.471-2.021 4.316 0 7.802 1.494 10.459 4.482 2.675 2.989 4.013 6.963 4.013 11.924v.381c0 3.086-.595 5.86-1.787 8.32-1.172 2.442-2.861 4.346-5.068 5.713-2.188 1.367-4.707 2.05-7.559 2.05-4.297 0-7.783-1.493-10.459-4.482-2.656-2.988-3.984-6.943-3.984-11.865v-.38zm5.449.645c0 3.516.811 6.338 2.432 8.467 1.64 2.129 3.828 3.193 6.562 3.193 2.754 0 4.942-1.074 6.563-3.222 1.621-2.168 2.431-5.196 2.431-9.083 0-3.476-.83-6.289-2.49-8.437-1.641-2.168-3.828-3.252-6.562-3.252-2.676 0-4.834 1.064-6.475 3.193-1.641 2.13-2.461 5.176-2.461 9.141zm56.983 0c0 4.824-1.104 8.71-3.311 11.66-2.207 2.95-5.195 4.424-8.965 4.424-3.848 0-6.875-1.22-9.082-3.662v15.264h-5.42V15.3h4.951l.264 3.515c2.207-2.734 5.273-4.101 9.199-4.101 3.809 0 6.817 1.435 9.024 4.306 2.226 2.872 3.34 6.866 3.34 11.983v.498zm-5.42-.615c0-3.575-.762-6.397-2.286-8.467-1.523-2.07-3.613-3.106-6.269-3.106-3.281 0-5.742 1.456-7.383 4.366v15.146c1.621 2.89 4.102 4.336 7.441 4.336 2.598 0 4.659-1.025 6.182-3.076 1.543-2.07 2.315-5.137 2.315-9.2zm25.488 16.699c-4.297 0-7.793-1.406-10.488-4.219-2.696-2.832-4.043-6.611-4.043-11.338v-.996c0-3.144.595-5.947 1.787-8.408 1.211-2.48 2.89-4.414 5.039-5.8 2.168-1.407 4.511-2.11 7.031-2.11 4.121 0 7.324 1.357 9.609 4.072 2.286 2.715 3.428 6.602 3.428 11.66v2.256h-21.474c.078 3.125.986 5.654 2.724 7.588 1.758 1.914 3.985 2.871 6.68 2.871 1.914 0 3.535-.39 4.863-1.172 1.328-.781 2.49-1.816 3.486-3.105l3.311 2.578c-2.656 4.082-6.641 6.123-11.953 6.123zm-.674-28.418c-2.187 0-4.023.8-5.508 2.402-1.484 1.582-2.402 3.809-2.754 6.68h15.879v-.41c-.156-2.754-.898-4.883-2.226-6.387-1.328-1.523-3.125-2.285-5.391-2.285zm34.658.996a16.23 16.23 0 00-2.666-.205c-3.554 0-5.967 1.514-7.236 4.541V47h-5.42V15.3h5.273l.088 3.663c1.778-2.832 4.297-4.248 7.559-4.248 1.055 0 1.855.137 2.402.41v5.04zm23.467 18.428c0-1.465-.557-2.598-1.67-3.399-1.094-.82-3.017-1.523-5.771-2.109-2.735-.586-4.912-1.29-6.534-2.11-1.601-.82-2.793-1.796-3.574-2.93-.762-1.132-1.142-2.48-1.142-4.042 0-2.598 1.093-4.795 3.281-6.592 2.207-1.797 5.019-2.695 8.437-2.695 3.594 0 6.504.928 8.731 2.783 2.246 1.855 3.369 4.229 3.369 7.12h-5.449c0-1.485-.635-2.764-1.905-3.839-1.25-1.074-2.832-1.611-4.746-1.611-1.972 0-3.515.43-4.629 1.289-1.113.86-1.669 1.982-1.669 3.37 0 1.308.517 2.294 1.552 2.958 1.035.664 2.901 1.299 5.596 1.904 2.715.606 4.912 1.329 6.592 2.168 1.679.84 2.92 1.856 3.72 3.047.821 1.172 1.231 2.608 1.231 4.307 0 2.832-1.133 5.107-3.398 6.826-2.266 1.7-5.206 2.549-8.819 2.549-2.539 0-4.785-.45-6.738-1.348-1.953-.898-3.486-2.148-4.6-3.75-1.093-1.62-1.64-3.369-1.64-5.244h5.42c.097 1.816.82 3.262 2.168 4.336 1.367 1.055 3.164 1.582 5.39 1.582 2.051 0 3.692-.41 4.922-1.23 1.25-.84 1.875-1.954 1.875-3.34z"
        stroke="#000"
        strokeWidth={4}
        mask="url(#prefix__a)"
      />
    </Svg>
  );
}


var DevInfo = ({imageURI, name, description, tagline, y, index}) => {

  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * CARD_HEIGHT],
      outputRange: [0, -index * CARD_HEIGHT],
      extrapolateRight: "clamp",
    })
  );
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const translateYImage = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [-70, 0, 0, -70],
    extrapolate: "clamp",
  });
  const translateXImage = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [-80, 0, 0, -80],
    extrapolate: "clamp",
  });
  const translateXName = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [50, 0, 0, 50],
    extrapolate: "clamp",
  });


  return (
    <Animated.View style={[styles.info__devContainer, { opacity, transform: [ { translateY }]}]}>
      <Animated.View style={[styles.info__devHeader]}>
        <Animated.Text style={[styles.info__devNameText, {transform: [{translateX: translateXName}]}]}>{name}</Animated.Text>
        <Animated.View style={[{transform: [{translateY: translateYImage}, {translateX: translateXImage}]}]}>
        <Animated.Image
          style={[styles.info__devImage, {scaleX: scale, scaleY: scale}]}
          source={{
            uri: imageURI
          }}
        />
        </Animated.View>
      </Animated.View>
      <View style={{ marginTop: 10, padding: 10, flex: 1, borderWidth: 2, borderColor: "#0ff", borderBottomColor: "lightgrey"}}>
        <Text style={styles.info__devDescription}>{description}</Text>
      </View>
      <View style={styles.info__devTaglineCont}>
        <View ><Text style={styles.info__devTagline}>{tagline}</Text></View>
        <View><Text style={styles.info__devTaglineFooter}>{"- " + name}</Text></View>
      </View>
    </Animated.View>
  );
}


function InfoScreen({ navigation }) {

  const y = new Animated.Value(0)
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y }}}],{ useNativeDriver: true })



  const _handlePress = () => {
   Linking.openURL("https://phoenixcreation2.herokuapp.com");
 };

  return (
    <>
    <View style={styles.info__devTExt}>
      <DeveloperSVG />
    </View>
    <AnimatedScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      {...{onScroll}}
    >
    <Animated.View style={styles.info__container}>
      {/*<View style={styles.info__copyright}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10}}>Copyright</Text>
        <Text style={{ textAlign: 'justify', fontSize: 16, color: 'black'}}>We hearby declare that we do not claim any of the whatsapp styling.
        Also this is completely for educational purpose and does not conatin any purpose of corporative distribution.
        All rights reserved to <Text onPress={_handlePress} style={{ color: 'blue'}}>PhoenixCreation</Text> if there is any rights!
        </Text>
      </View>*/}
      <View style={styles.info__devs }>
        {
          developers.map((dev,i) => (
            <DevInfo
              imageURI={dev.imageURI}
              name={dev.name}
              description={dev.description}
              tagline={dev.tagline}
              y={y}
              key={i}
              index={i}
            />
          ))
        }
      </View>
      {/*
        // TODO: Add linkings for support.
        // A good support gives better and broader user base

      <View>
        <Text>For any type of query click below links:</Text>
        <Text>1. Message "Bot". He will reply soon.</Text>
        <Text>2. Open issue on Github.</Text>
        <Text>3. Contact any of the developers personally.</Text>
      </View>
      */}
    </Animated.View>
    </AnimatedScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  info__devTExt:{
    position:'absolute',
    top: 25,
    alignSelf: 'center',
  },
  info__container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
  },
  info__copyright: {
    marginTop: 25,
    width: '90%',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#075e55",
    borderRadius: 15,
  },
  info__devs: {
    flex: 1,
    marginTop: 15,
  },
  info__devContainer: {
    borderColor: "#075e55",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "column",
    padding: 10,
    margin: MARGIN,
    height: CARD_HEIGHT,
    backgroundColor: "#0ff",
    width: width - MARGIN * 3,
  },
  info__devHeader: {
    flexDirection: "column",

  },
  info__devNameText: {
    fontSize: 25,
    textAlign: 'center',
  },
  info__devImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  info__devDescription: {
    fontSize: 16,
    textAlign: 'justify',
  },
  info__devTaglineCont: {
    padding: 10,
  },
  info__devTagline: {
    fontSize: 15,
    textAlign: 'justify',
  },
  info__devTaglineFooter: {
    textAlign: "right",
  },
})

export default InfoScreen
