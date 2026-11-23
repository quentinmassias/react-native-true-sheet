import { forwardRef, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TrueSheet, type TrueSheetProps } from '@lodev09/react-native-true-sheet';

import { BLUE, DARK, GAP, LIGHT_GRAY, SPACING } from '../../utils';
import { Button } from '../Button';

const STEP = 8;

// Repro: content taller than the sheet's max height by less than the bottom inset
// never scrolls, and its end stays under the navigation bar.
export const InsetBandSheet = forwardRef<TrueSheet, TrueSheetProps>((props, ref) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { height } = useWindowDimensions();
  const [filler, setFiller] = useState(Math.round(height * 0.6));

  return (
    <TrueSheet
      ref={ref}
      name="inset-band"
      detents={['auto']}
      scrollableRef={scrollViewRef}
      backgroundColor={Platform.select({ android: DARK })}
      {...props}
    >
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
        <Text style={styles.text}>Filler: {filler} dp</Text>
        <Button text={`+${STEP} dp`} onPress={() => setFiller((value) => value + STEP)} />
        <Button text={`-${STEP} dp`} onPress={() => setFiller((value) => value - STEP)} />
        <View style={[styles.filler, { height: filler }]} />
        <View style={styles.last}>
          <Text style={styles.lastText}>Last row</Text>
        </View>
      </ScrollView>
    </TrueSheet>
  );
});

InsetBandSheet.displayName = 'InsetBandSheet';

const styles = StyleSheet.create({
  content: {
    padding: SPACING,
    gap: GAP,
  },
  text: {
    color: LIGHT_GRAY,
    fontSize: 16,
  },
  filler: {
    borderRadius: SPACING,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  last: {
    height: SPACING * 4,
    borderRadius: SPACING,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastText: {
    color: 'white',
    fontWeight: '600',
  },
});
