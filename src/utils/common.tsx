import React from 'react';
import {ElectricSvg, FanSVG, LightBulb, OutletIcon} from '../components/Svgs';

export interface IconItemT {
  index: number;
  icon: any;
  title: string;
}

export const ListIcon: IconItemT[] = [
  {index: 0, icon: <LightBulb />, title: 'Đèn điện'},
  {index: 1, icon: <FanSVG />, title: 'Quạt điện'},
  {index: 2, icon: <OutletIcon />, title: 'Thiết bị điện'},
  {index: 3, icon: <ElectricSvg />, title: 'Thiết bị điện 2'},
];
