/*
 * @Author: 姚盛60364 sheng.yao@going-link.com
 * @Date: 2023-07-20 13:48:43
 * @LastEditors: 姚盛60364 sheng.yao@going-link.com
 * @LastEditTime: 2023-11-08 15:56:17
 * @FilePath: /collector-data-update/src/pages/Language/Language.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC, useEffect } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { Button, Upload, Space, Input } from 'antd';
import { useReactive } from 'ahooks';
import { exportExcel } from '@/utils/globaling';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import CustSpin from '@/components/CustSpin/CustSpin';

const intl = {
  get: id => {
    return {
      d: text => {
        return { code: id, text };
      }
    };
  }
};

const fieldList = [
  {
    label: intl.get('sdrp.supplierPerformance.model.indicatorCode').d('指标编码'),
    name: 'indicatorCode'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.indicatorName').d('指标描述'),
    name: 'indicatorName'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.evalWeightScore').d('权重'),
    name: 'evalWeightScore'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.finalScore').d('指标得分'),
    name: 'finalScore'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.avgScore').d('同维度指标平均得分'),
    name: 'avgScore'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.diffScore').d('与平均值的分差'),
    name: 'diffScore'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.maxScore').d('同维度指标最高分'),
    name: 'maxScore'
  },
  {
    label: intl.get('sdrp.supplierPerformance.model.minScore').d('同维度指标最低分'),
    name: 'minScore'
  }
];

const templateCode = 'sdrp.supplierPerformance';

const Language: FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="language__container flex_column">
      <Button
        onClick={() => {
          const excelTemplate = [
            { title: '租户编码*', key: '租户编码*' },
            { title: '租户名称*', key: '租户名称*' },
            { title: '模板代码*', key: '模板代码*' },
            { title: '代码*', key: '代码*' },
            { title: '中文(简体)', key: '中文(简体)' },
            { title: 'English(US)', key: 'English(US)' },
            { title: '日本語', key: '日本語' },
            { title: 'ไทย', key: 'ไทย' },
            { title: '繁體中文', key: '繁體中文' },
            { title: 'Tiếng việt', key: 'Tiếng việt' },
            { title: 'Русский', key: 'Русский' }
          ];
          const mulMap = {};
          const _fieldList = [];
          fieldList.forEach(item => {
            if (mulMap[item.label.code]) return;
            _fieldList.push(item);
            mulMap[item.label.code] = 1;
          });
          const data = _fieldList.map(item => {
            return {
              '租户编码*': 'SRM',
              '租户名称*': 'SRM 平台',
              '模板代码*': templateCode,
              '代码*': item.label.code.replace(`${templateCode}.`, ''),
              '中文(简体)': item.label.text,
              'English(US)': '-'
            };
          });
          exportExcel(excelTemplate, data, `多语言描述.xlsx`);
        }}
      >
        导出
      </Button>
    </div>
  );
};

export default observer(Language);
