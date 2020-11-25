import React from 'react';
import CaseCard from './CaseCard';

interface Props {
  selectCase: (arg0: string) => void;
  cases: Array<{}>;
}

const CaseList: React.FC<Props> = ({ selectCase, cases }: Props) => {
  if (cases.length > 0) {
    return (
      <>
        {
          cases.map((item: any, index) => (
            <CaseCard
              selectCase={selectCase}
              key={Math.random()}
              tabIndex={index}
              item={item}
            />
          ))
        }
      </>
    );
  }
  return (
    <div>
      <p>Loading cases...</p>
    </div>
  );
};

export default CaseList;
