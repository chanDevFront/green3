import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function HeaderComponent() {
    const [sub, setSub] = useState(Array(4).fill(false));
    const [nav, setNav] = useState({
        메뉴: []
    });

    const onMouseEnterMainBtn=(e, number)=>{
        let imsi = Array(4).fill(false);
        imsi[number] = true;
        setSub(imsi);
    }

    const onMouseLeaveMainBtn=()=>{
        const imsi = Array(4).fill(false);
        setSub(imsi);
    }

    useEffect(() => {
        axios({
            url: './json/nav.json', 
            method: 'GET'
        })
            .then((res) => {
                console.log(res, 'axios 성공');
                setNav({
                    메뉴: res.data.메뉴
                });
            })
            .catch((err) => console.log(err, 'axios 실패'))
    }, []);

    // useEffect(() => {
    //     console.log(nav);
    // }, [nav]);

    // 객체를 지정하는 방식
    // . 점 표기법 => 공백이 포함안된 상태만 가능
    // [''] 대괄호 표기법 => 공백이 포함되어있어도 사용 가능
    // 객체는 키:값(밸루) 형태의 한 쌍으로 구성
    // Object.keys() -> 객체의 모든 키를 배열로 반환
    // Object.value() -> 객체의 모든 값을 배열로 반환
    // Object.entrtes() -> 객체의 키-값 쌍을 배열로 반환
    // ex) entres.forEach(([key, value]) => {});
    // 객체 배열로 처음부터 데이터를 구성할 수 없는 경우 == ex) 데이터를 외부 API로부터 받아오는 경우
    // 이럴때는 개체 메서드를 사용해야함 - 특히, 순서가 중요한 경우 배열로 변환

    return (
        <header id="header" className="">
            <div className="row1">
                <h1><a href="./" title="푸른마을"><span>푸른</span><em>마을</em></a></h1>
                <div className="mobile-bnt-box">
                    <a href="!#" className="mobile-bnt">
                        <i className="line line1"></i>
                        <i className="line line2"></i>
                        <i className="line line3"></i>
                    </a>
                </div>
            </div>
            <div className="row2">
                <nav id="nav">
                    <ul onMouseLeave={onMouseLeaveMainBtn}>
                        {
                            nav.메뉴.map((item, idx) => 
                                <li key={'menu' + idx}>
                                    <a href="!#" className="main-btn" title={item.메인}  onMouseEnter={(e)=>onMouseEnterMainBtn(e, idx)}>{item.메인}</a>
                                    {
                                        sub[idx] && 
                                        <div className={`sub sub${idx+1}`}>
                                            <ul>
                                                {
                                                    item.서브.map((sub, idx2) => 
                                                        <li key={'sub' + idx2}>
                                                            {
                                                                sub.map((item3, idx3) => 
                                                                    <span key={item3[idx3] + (idx3 + 1)}>
                                                                        <a href="!#">{item3}</a>
                                                                    </span>
                                                                )
                                                            }
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    }
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}