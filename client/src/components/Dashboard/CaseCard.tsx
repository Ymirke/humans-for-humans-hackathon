import React from 'react';
import moment from 'moment';

interface Props {
  key: number;
  selectCase: (arg0: string) => void;
  tabIndex: number;
  item: {
    _id: string;
    issue: string;
    createdAt: number;
    closed: boolean;
  };
}

export default function CaseCard({
  item, tabIndex, key, selectCase,
}: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      key={key}
      role="button"
      onClick={() => {
        selectCase(item._id);
      }}
      tabIndex={tabIndex}
      className="content__card"
    >
      <h2>
        Case identifier:
        {item._id}
      </h2>
      <h3>{`${item.issue.slice(0, 140)}...`}</h3>
      <p>{moment(item.createdAt).format('L')}</p>
      <div className={item.closed ? 'closed__true' : 'closed__false'} />
    </div>
  );
}
