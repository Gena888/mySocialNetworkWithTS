import React, { useState } from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    pageSize: number
    currentPage: number
    totalItemsCount: number
    portionSize: number
    onPageChanged: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = ({ onPageChanged, pageSize, currentPage, totalItemsCount, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rigthPortionNumber = (portionNumber * portionSize)
    //classnames( cn ) функцию в которую мы через , передаём классы 
    // {cn(style1, {[style2]: условие})} <-- кейс с условием для одного из стилей
    return (
        <div className={s.paginator}>
            <div className={s.prevButtonDiv + ' ' + s.buttonDiv}>
                {portionNumber > 1 &&
                    <button className={s.prevButton + ' ' + s.button} onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>}
            </div>

            <div className={s.pages}>
                {pages
                    .filter(p => p >= leftPortionNumber && p <= rigthPortionNumber)
                    .map((p) => {
                        return <span className={cn({
                            [s.selectedPage]: currentPage === p
                        }, s.pageNumber)}
                            key={p}
                            onClick={(e) => {
                                onPageChanged(p);
                            }} >
                            {p}</span>
                    })}
            </div>

            <div className={s.nextButtonDiv + ' ' + s.buttonDiv}>
                {portionCount > portionNumber &&
                    <button className={s.nextButton + ' ' + s.button} onClick={() => { setPortionNumber(portionNumber + 1) }}
                    >next</button>}
            </div>



        </div >
    )
}

export default Paginator; 