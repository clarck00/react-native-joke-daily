import React, {PureComponent} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Swiper from 'react-native-deck-swiper';

interface Props {
}

export default class ItemSwiper extends PureComponent<Props, any> {

  render() {
    return (
      <View>
      <Swiper
      ref={(swiper: any) => {
        this.swiper = swiper;
      }}
      cards={cards}
      renderCard={this.renderCard}
      cardIndex={0}
      cardHorizontalMargin={15}
      cardVerticalMargin={0}
      marginBottom={135}
      marginTop={getStatusBarHeight(true) * 0.5 + 60}
      //       keyExtractor={(item, index) => index.toString()}
      backgroundColor={colors.BACKGROUND}
      animateCardOpacity
      showSecondCard
      stackSize={3}
      disableBottomSwipe={true}
      disableTopSwipe={true}
      swipeAnimationDuration={50}
      swipeBackCard
      onSwipedAborted={this.onEndSwipe}
      dragStart={this.onStartSwipe}
      dragEnd={this.onEndSwipe}
      onSwipedAll={this.onSwipedAllCards}
      stackAnimationTension={80} // spring animation tension (speed) default 40
      stackAnimationFriction={10} // spring animation friction (bounciness), default is 7
      stackSeparation={14}
      overlayLabels={{
        top: {
          title: 'LIKED',
          style: {
            label: {
              backgroundColor: 'black',
              borderColor: 'black',
              color: 'white',
              borderWidth: 1,
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        },
      }}
      animateOverlayLabelsOpacity>
      
      </Swiper>
      </View>
    );
  }
}
