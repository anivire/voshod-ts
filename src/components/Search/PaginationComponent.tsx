import { FC, useEffect, useState } from 'react';
import RiArrowRightSLine from '~icons/ri/arrow-right-s-line';
import RiArrowLeftSLine from '~icons/ri/arrow-left-s-line';
import RiArrowRightDoubleLine from '~icons/ri/arrow-right-double-line';
import RiArrowLeftDoubleLine from '~icons/ri/arrow-left-double-line';
import classNames from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageUpdate: (page: number) => void;
}

export const PaginationComponent: FC<Props> = ({
  currentPage,
  totalPages,
  onPageUpdate,
}) => {
  function setPage(page: number) {
    onPageUpdate(page);
  }

  return (
    <>
      <div className="col-span-3 flex w-full flex-row items-center gap-2">
        <button
          onClick={() => setPage(1)}
          className="rounded-xl bg-zinc-900 p-3 md:hover:bg-zinc-800"
        >
          <RiArrowLeftDoubleLine />
        </button>
        <button
          onClick={() => currentPage > 1 && setPage(currentPage - 1)}
          className={classNames('rounded-xl p-3', {
            'cursor-not-allowed bg-rose-900/50': currentPage === 1,
            'bg-zinc-900 md:hover:bg-zinc-800': currentPage !== 1,
          })}
        >
          <RiArrowLeftSLine />
        </button>
        <p className="mx-5 tabular-nums">{currentPage}</p>
        <button
          onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
          className={classNames('rounded-xl p-3', {
            'cursor-not-allowed bg-rose-900/50': currentPage === totalPages,
            'bg-zinc-900 md:hover:bg-zinc-800': currentPage !== totalPages,
          })}
        >
          <RiArrowRightSLine />
        </button>
        <button
          onClick={() => setPage(totalPages)}
          className="rounded-xl bg-zinc-900 p-3 md:hover:bg-zinc-800"
        >
          <RiArrowRightDoubleLine />
        </button>
      </div>
    </>
  );
};
