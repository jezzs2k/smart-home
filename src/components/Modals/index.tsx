import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, StyleProp, ViewProps} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../config';

interface IPropsModalNotification {
    modalVisible: boolean;
    customStyleWrap?: StyleProp<ViewProps>;
    customTextTitle?: string;
    customTextContent?: string;
    customTextCancel?: string;
    customTextAccept?: string;
    isJustShowCancel?: boolean;

    onAccept?: () => void;
    onCancel?: () => void;
    setModalVisible: (isVisible?: boolean) => void;
};

export const ModalNotification = ({
        modalVisible, 
        customStyleWrap = {}, 
        customTextTitle = '', 
        customTextContent= '', 
        customTextCancel= 'Cancel', 
        customTextAccept='Accept', 
        isJustShowCancel = false,

        setModalVisible, 
        onCancel, 
        onAccept
    }: IPropsModalNotification) => {
    const handleAccept = () => {
        setModalVisible(false);
        onAccept?.();
    };

    return (
        <Modal transparent visible={modalVisible}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: Colors.BLACK, opacity: 0.7, height: '100%', width: '100%'}}></View>

                <View style={styles.modal}>
                    <View style={[styles.wrap, customStyleWrap]}>
                        <View
                            style={[styles.wrapText]}>
                            <Text
                                style={styles.textTitle}>{customTextTitle}</Text>
                            <Text style={[styles.textContent]}>
                                {customTextContent}
                            </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    onCancel?.();
                                    setModalVisible(false)
                                }}
                                style={styles.buttonCancel}>
                                <Text style={{
                                    color: Colors.RED,
                                }}>{customTextCancel}</Text>
                            </TouchableOpacity>
                            {!isJustShowCancel && <TouchableOpacity
                                onPress={handleAccept}
                                style={styles.buttonDelete}>
                                <Text style={{
                                    color: Colors.primary,
                                }}>{customTextAccept}</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute"
    },
    wrap: {
        width: widthPercentageToDP(75),
        borderRadius: 14,
        backgroundColor: Colors.WHITE,
        paddingTop: heightPercentageToDP(4.2)
    },
    wrapText: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.BG,
        paddingBottom: heightPercentageToDP(4.5)
    },
    textTitle: {
        fontWeight: '600',
        color: Colors.TEXT,
        textAlign: 'center',
        maxWidth: '95%',
        paddingBottom: heightPercentageToDP(1),
    },
    textContent: {
        color: Colors.BLACK,
        textAlign: 'center',
        fontWeight: 'normal',
        maxWidth: '98%',
        paddingHorizontal: widthPercentageToDP(3),
    },
    buttonCancel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: Colors.BG_INPUT,
        paddingVertical: heightPercentageToDP(2)
    },
    buttonDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: heightPercentageToDP(2)
    },
});
