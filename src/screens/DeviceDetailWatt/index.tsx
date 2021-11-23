import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useIsFocused,
  useRoute,
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
import database from '@react-native-firebase/database';
import {DeviceT} from '../../stores/factories/device';
import {Colors} from '../../config';
import {
  IModalLoadingPassProp,
  ModalLoading,
} from '../../components/ModalLoading';
import {LineChart} from 'react-native-chart-kit';
import useTimeout from '../../Hooks/useTimeout';

interface RenderItemT {
  title: string;
  value: string | number;
  unit?: string;
  index?: number;
}

interface DeviceDetailsProps extends IModalLoadingPassProp {}

const WAT_DEFAULT = 10000;

let m15 = '';
let h1 = '';
let h6 = '';
let h12 = '';
let h24 = '';
let w1 = '';
let M1 = '';

const RenderItem = ({title, value, unit, index}: RenderItemT) => {
  return (
    <View style={styles.itemMeasure}>
      <Text style={[styles.textSmall, styles.text]} key={`key` + index}>
        {title}
      </Text>
      <Text style={[styles.textMid, styles.text]}>
        {value} {unit || ''}
      </Text>
    </View>
  );
};

export const DeviceDetailsWatt = ModalLoading()(
  ({onCloseLoading, onSetLoading}: DeviceDetailsProps) => {
    const [dataEnergy, setDataEnergy] = useState<{
      current: string;
      electricityBill: string;
      energytage: string;
      frequency: string;
      pf: string;
      power: string;
      voltage: string;
    } | null>(null);
    const [testW, setTestW] = useState(0);
    const [dataWatt, setDataWatt] = useState([0, 0, 0, 0, 0, 0, 0]);
    const ListItemMeasure: RenderItemT[] = [
      {
        title: 'Điện áp',
        value: dataEnergy?.voltage || 0,
        unit: 'V',
      },
      {
        title: 'Dòng điện',
        value: dataEnergy?.current || 0,
        unit: 'A',
      },
      {
        title: 'Công suất',
        value: dataEnergy?.power || 0,
        unit: 'W',
      },
      {
        title: 'Tần số',
        value: dataEnergy?.frequency || 0,
        unit: 'Hz',
      },
      {
        title: 'Tiền điện tạm tính cho thiết bị này',
        value: dataEnergy?.electricityBill || 0,
        unit: 'VND',
      },
    ];
    const [m15E, setm15E] = useState(0);
    const [h1E, seth1E] = useState(0);
    const [h6E, seth6E] = useState(0);
    const [h12E, seth12E] = useState(0);
    const [h24E, seth24E] = useState(0);
    const [w1E, setw1E] = useState(0);
    const [M1E, setM1E] = useState(0);
    const navigation = useNavigation<NavigationProp<any>>();
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<{params: {item: DeviceT}}>>();
    const itemDevice = route.params.item;

    useEffect(() => {
      m15 = '';
      h1 = '';
      h6 = '';
      h12 = '';
      h24 = '';
      w1 = '';
      M1 = '';
    }, []);

    useEffect(() => {
      if (dataEnergy) {
        setTestW((Number(dataEnergy.energytage) + 1) / WAT_DEFAULT);
      }
    }, [dataEnergy]);

    useTimeout(() => {
      if (itemDevice.deviceId) {
        database()
          .ref('/' + itemDevice.deviceId)
          .on('value', snapshot => {
            onCloseLoading();
            const data = snapshot.val();
            if (data.energy) {
              let valueEnrgy: any = {};
              data.energy.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              setDataEnergy(valueEnrgy);
            }

            if (data.m15 && m15 !== data.m15) {
              let valueEnrgy: any = {};
              data.m15.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              setm15E(valueEnrgy.energytage);
              m15 = data.m15;
            }

            if (data.h1 && h1 !== data.h1) {
              h1 = data.h1;
              let valueEnrgy: any = {};
              data.h1.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              seth1E(valueEnrgy.energytage);
            }

            if (data.h6 && h6 !== data.h6) {
              h6 = data.h6;
              let valueEnrgy: any = {};
              data.h6.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              seth6E(valueEnrgy.energytage);
            }

            if (data.h12 && h12 !== data.h12) {
              h12 = data.h12;
              let valueEnrgy: any = {};
              data.h12.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              seth12E(valueEnrgy.energytage);
            }

            if (data.h24 && h24 !== data.h24) {
              h24 = data.h24;
              let valueEnrgy: any = {};
              data.h24.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              seth24E(valueEnrgy.energytage);
            }

            if (data.w1 && w1 !== data.w1) {
              w1 = data.w1;
              let valueEnrgy: any = {};
              data.w1.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              setw1E(valueEnrgy.energytage);
            }

            if (data.M1 && M1 !== data.M1) {
              M1 = data.M1;
              let valueEnrgy: any = {};
              data.M1.split(',').forEach((item: string, index: number) => {
                if (index === 0) {
                  valueEnrgy[item.split(':')[0].split('{')[1]] =
                    item.split(':')[1];
                }

                if (item !== '}') {
                  valueEnrgy[item.split(':')[0]] = item.split(':')[1];
                }
              });

              setM1E(valueEnrgy.energytage);
            }
          });
      }
    }, 1000);

    useEffect(() => {
      onSetLoading();

      return () => {
        database().ref(`/${itemDevice.deviceId}`).off();
      };
    }, []);

    useEffect(() => {
      if (m15E !== 0) {
        dataWatt[1] = m15E;
        setDataWatt(dataWatt);
      }
    }, [m15E]);

    useEffect(() => {
      if (h1E !== 0) {
        dataWatt[2] = h1E;
        setDataWatt(dataWatt);
      }
    }, [h1E]);

    useEffect(() => {
      if (h6E !== 0) {
        dataWatt[3] = h6E;
        setDataWatt(dataWatt);
      }
    }, [h6E]);

    useEffect(() => {
      if (h12E !== 0) {
        dataWatt[4] = h12E;
        setDataWatt(dataWatt);
      }
    }, [h12E]);

    useEffect(() => {
      if (h24E !== 0) {
        dataWatt[5] = h24E;
        setDataWatt(dataWatt);
      }
    }, [h24E]);

    useEffect(() => {
      if (w1E !== 0) {
        dataWatt[6] = w1E;
        setDataWatt(dataWatt);
      }
    }, [w1E]);

    useEffect(() => {
      if (M1E !== 0) {
        dataWatt[7] = M1E;
        setDataWatt(dataWatt);
      }
    }, [M1E]);

    const handleBack = () => navigation.goBack();

    return (
      <View style={styles.container}>
        <View style={styles.titleHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <AntDesign name={'arrowleft'} size={30} />
          </TouchableOpacity>
          <View style={[styles.titleHeaderText]}>
            <Text style={[styles.textBold, styles.textSmall]}>
              Chi tiết Công xuất điện
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text
              style={[
                styles.textMid,
                styles.textBold,
                styles.text,
                styles.titleProgress,
                {color: Colors.LIGHT_RED},
              ]}>
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
              formatText={process => {
                return (
                  <Text style={[styles.textMid, styles.textBold]}>
                    {dataEnergy?.energytage ?? '0'} W
                  </Text>
                );
              }}
            />
          </View>
          <View style={styles.headerRight}>
            {ListItemMeasure.map((item: RenderItemT, index: number) => (
              <RenderItem {...item} key={'keys' + index} />
            ))}
          </View>
        </View>
        <View style={styles.content}>
          <Text
            style={[
              styles.textMid,
              styles.textBold,
              styles.text,
              styles.titleProgress,
              {color: Colors.LIGHT_RED},
            ]}>
            Năng lượng tiêu thụ (KWH)
          </Text>

          <View style={styles.chartStyle}>
            <LineChart
              data={{
                labels: ['0', '15m', '1h', '6h', '12h', '24h', '1w', '1m'],
                datasets: [
                  {
                    data: dataWatt,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              yAxisLabel=""
              yAxisSuffix="W"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: Colors.TEXT1,
                backgroundGradientFrom: Colors.WHITE,
                backgroundGradientTo: Colors.WHITE,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: Colors.WHITE,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
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
    flexDirection: 'row',
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
    color: Colors.TEXT1,
    maxWidth: '70%',
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
    width: '88%',
  },
  backBtn: {},
});
