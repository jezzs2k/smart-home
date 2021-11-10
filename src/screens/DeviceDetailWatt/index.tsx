import {
    NavigationProp,
    useNavigation,
  } from '@react-navigation/native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import React, {useEffect, useState} from 'react';
  import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import * as Progress from 'react-native-progress';
  import {Colors} from '../../config';
  import {
    IModalLoadingPassProp,
    ModalLoading,
  } from '../../components/ModalLoading';
import { LineChart } from 'react-native-chart-kit';

  interface RenderItemT {
    title: string; value: string | number, unit?: string;
    index?: number;
  }

  interface DeviceDetailsProps extends IModalLoadingPassProp {}

  const WAT_DEFAULT = 100;

  const ListItemMeasure: RenderItemT[] = [
    {
        title: 'Điện áp',
        value: 226.8,
        unit: 'V'
    },
    {
        title: 'Dòng điện',
        value: 0.14,
        unit: 'A'
    },
    {
        title: 'Công suất',
        value: 30.1,
        unit: 'W'
    },
    {
        title: 'Tần số',
        value: 50,
        unit: 'Hz'
    },
    {
        title: 'Hệ số công suất',
        value: 0.93,
        unit: 'V'
    }
  ]

const RenderItem = ({title, value, unit, index}: RenderItemT) => {
    return <View style={styles.itemMeasure}>
    <Text style={[styles.textSmall, styles.text]} key={`key` + index}>
        {title}
    </Text>
    <Text style={[styles.textMid, styles.text]}>
        {value} {unit || ''}
    </Text>
</View>
}
  
  export const DeviceDetailsWatt = ModalLoading()(
    ({onCloseLoading, onSetLoading}: DeviceDetailsProps) => {

        const [testW, setTestW] = useState(0);
        const [test, setTest] = useState(0);
        const navigation = useNavigation<NavigationProp<any>>();

        const handleBack = () => navigation.goBack();

        useEffect(() => {
            setInterval(() => {
                if (test >= 100) {
                    setTestW(0);
                    setTest(0);
                    return;
                };
                setTestW((t) => t + ((test+1) / WAT_DEFAULT));
                setTest((t) => t+1);
            }, 1000)
        }, [])
  
      return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                    <AntDesign name={'arrowleft'} size={30} />
                </TouchableOpacity>
                <View style={[styles.titleHeaderText]}>
                    <Text style={[styles.textBold, styles.textSmall]}>Chi tiết Công xuất điện</Text>
                </View>
            </View>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.textMid, styles.textBold, styles.text, styles.titleProgress, {color: Colors.LIGHT_RED}]}>
                        Công suất
                    </Text>
                    <Progress.Circle 
                        borderWidth={0} 
                        progress={testW} 
                        size={200} 
                        unfilledColor={Colors.BORDER} 
                        indeterminate={false} 
                        showsText={true} 
                        strokeCap={'round'} 
                        thickness={10} 
                        color={Colors.LIGHT_RED}
                        formatText={(process) => {
                            return <Text style={[styles.textMid, styles.textBold]}>{test}/{WAT_DEFAULT} W</Text>
                        }}
                    />
                </View>
                <View style={styles.headerRight}>
                    {ListItemMeasure.map((item:RenderItemT, index: number)  => <RenderItem {...item} key={'keys' + index} />)}
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.textMid, styles.textBold, styles.text, styles.titleProgress, {color: Colors.LIGHT_RED}]}>
                    Biểu đồ công suất
                </Text>

                <View style={styles.chartStyle}>
                     <LineChart
                        data={{
                            labels: ["15m","1h", "6h", "1d", "1w", "1M"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 15,
                                        Math.random() * 45,
                                        Math.random() * 55,
                                        Math.random() * 75,
                                        Math.random() * 90,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="W"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: Colors.TEXT1,
                            backgroundGradientFrom: Colors.WHITE,
                            backgroundGradientTo: Colors.WHITE,
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: Colors.WHITE
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            </View>
        </View>
      );
    },
  );
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.WHITE,
        paddingTop: 55,
    },
    header: {
      flexDirection:"row",
    },
    headerRight: {
      flexDirection: 'column',
      marginLeft: 22,
    },
    headerLeft: {
        paddingTop: 8,
    },
    itemMeasure: {
      flexDirection: 'column',
      marginVertical: 8,
    },
    content: {},
    chartStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      color: Colors.TEXT1
    },
    titleProgress: {
        marginBottom: 16,
    },
    textBold: {
      fontWeight: '700',
    },
    textSmall: {
      fontSize: 16,
    },
    textMid: {
        fontSize: 20,
    },
    titleHeader: {
        position: 'absolute',
        top: 15,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleHeaderText: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '88%'
    },
    backBtn: {},
  });
  