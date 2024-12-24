/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

export default function Section1Component() {
    const [slide, setSlide] = useState({
        메인슬라이드: []
    });
    const [link, setLink] = useState({
        바로가기: []
    });
    const [page, setPage] = useState(Array(3).fill(false));
    const slideWrap = useRef();
    const [stop, setStop] = useState('play');
    const [cnt, setCnt] = useState(0);
    const [id, setId] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [ease, setEase] = useState({
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        linear: "cubic-bezier(0, 0, 1, 1)",
        easeIn: "cubic-bezier(0.42, 0, 1, 1)",
        easeOut: "cubic-bezier(0, 0, 0.58, 1)",
        easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",

        cubic1: 'cubic-bezier(0.95, 0, 0, 0)',
        cubic2: 'cubic-bezier(0, 0, 0, 0.95)',
        cubic3: 'cubic-bezier(0.95, 0, 0, 0.95)',
        cubic4: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
        cubic5: 'cubic-bezier(0, 0, 1, 1)',
        cubic6: 'cubic-bezier(0.1, -0.6, 0.2, 0)',
        cubic7: 'cubic-bezier(0, 1.1, 0.8, 1)',
        cubic8: 'cubic-bezier(0.1, 0.5, 1.0, 0.5)',
        cubic9: 'cubic-bezier(0.45, 0.6, 1, 0.1)',
        cubic10: 'cubic-bezier(0.3, 1, 1, 0.3)',
        cubic11: 'cubic-bezier(0.9, 0.3, 0.2, 1)',
        cubic12: 'cubic-bezier(0.03, 0.66, 0.32, 0.99)',
        cubic13: 'cubic-bezier(0.81, 0.08, 0.99, 0.26)',
        cubic14: 'cubic-bezier(0.83, 0.14, 0, 0.91)',

        easeInCubic: 'cubic-bezier(.55,.055,.675,.19)',
        easeOutCubic: 'cubic-bezier(.215,.61,.355,1)',
        easeInOutCubic: 'cubic-bezier(.645,.045,.355,1)',
        easeInCirc: 'cubic-bezier(.6,.04,.98,.335)',
        easeOutCirc: 'cubic-bezier(.075,.82,.165,1)',
        easeInOutCirc: 'cubic-bezier(.785,.135,.15,.86)',
        easeInExpo: 'cubic-bezier(.95,.05,.795,.035)',
        easeOutExpo: 'cubic-bezier(.19,1,.22,1)',
        easeInOutExpo: 'cubic-bezier(1,0,0,1)',
        easeInQuad: 'cubic-bezier(.55,.085,.68,.53)',
        easeOutQuad: 'cubic-bezier(.25,.46,.45,.94)',
        easeInOutQuad: 'cubic-bezier(.455,.03,.515,.955)',
        easeInQuart: 'cubic-bezier(.895,.03,.685,.22)',
        easeOutQuart: 'cubic-bezier(.165,.84,.44,1)',
        easeInOutQuart: 'cubic-bezier(.77,0,.175,1)',
        easeInQuint: 'cubic-bezier(.755,.05,.855,.06)',
        easeOutQuint: 'cubic-bezier(.23,1,.32,1)',
        easeInOutQuint: 'cubic-bezier(.86,0,.07,1)',
        easeInSine: 'cubic-bezier(.47,0,.745,.715)',
        easeOutSine: 'cubic-bezier(.39,.575,.565,1)',
        easeInOutSine: 'cubic-bezier(.445,.05,.55,.95)',
        easeInBack: 'cubic-bezier(.6,-.28,.735,.045)',
        easeOutBack: 'cubic-bezier(.175, .885,.32,1.275)',
        easeInOutBack: 'cubic-bezier(.68,-.55,.265,1.55)'
    });

    useEffect(() => {
        fetch(
            './json/main_slide.json',
            { method: 'GET' }
        )
            .then((res) => res.json())
            .then((data) => {
                setSlide({
                    메인슬라이드: data.메인슬라이드
                })
            })
            .catch((err) => {
                console.log("fetch() API 실패");
                console.log(err)
            })
    }, [])

    useEffect(() => {
        fetch(
            './json/section1.json',
            { method: 'GET' }
        )
            .then((res) => res.json())
            .then((data) => {
                setLink({
                    바로가기: data.바로가기
                })
            })
            .catch((err) => {
                console.log("fetch() API 실패");
                console.log(err)
            })
    }, [])

    function mainSlide() {
        slideWrap.current.style.transition = `transform 0.6s ${ease.easeInOutExpo}`;
        slideWrap.current.style.transform = `translateX(${-1703 * cnt}px)`;

        let imsi = Array(3).fill(false);
        imsi[cnt === 3 ? 0 : (cnt === -1 ? 2 : cnt)] = true;
        if (imsi.length === 3) {
            setPage(imsi);
        }
    }

    const onTransitionEndEvent = (e) => {
        if (cnt > 2) {
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.transform = `translateX(${-1703 * 0}px)`;
            setTimeout(() => {
                setCnt(0);
            }, 10);
        }
        else if (cnt < 0) {
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.transform = `translateX(${-1703 * 2}px)`;
            setTimeout(() => {
                setCnt(2);
            }, 10);
        }
    }

    useEffect(() => {
        mainSlide();
    }, [cnt])

    function nextCount() {
        setCnt(cnt => cnt + 1);
    }

    function prevCount() {
        setCnt(cnt => cnt - 1);
    }

    function autoTimer() {
        const imsi = setInterval(() => {
            nextCount();
        }, 4000);
        setId(imsi);
        return () => clearInterval(imsi);
    }

    useEffect(() => {
        if (stop === 'play') {
            autoTimer();
        }
    }, [stop]);

    const onMouseEnterSlideContainer = () => {
        clearInterval(id);
        setStop('stop');
    }

    const onMouseLeaveSlideContainer = () => {
        setStop('play');
    }

    const onMouseDownSlideContainer = (e) => {
        setMouseDown('down');
        setTouchStart(e.clientX);

        let drgStart = e.clientX - (slideWrap.current.getBoundingClientRect().left + 1703 - 200);
        setDragStart(drgStart);
    }

    useEffect(() => {
        if (mouseDown === 'down') {
            function mouseupFn(e) {
                setMouseUp('up');
                setTouchEnd(e.clientX);         
                document.removeEventListener('mouseup', mouseupFn);
            }
            document.addEventListener('mouseup', mouseupFn);
        }
    }, [mouseDown]);

    useEffect(() => {
        if (mouseUp === 'up') {
            if ((touchStart - touchEnd) > 200) {
                nextCount();
            }

            if ((touchStart - touchEnd) < -200) {
                prevCount();
            }

            if (((touchStart - touchEnd) <= 200) && ((touchStart - touchEnd) >= -200)) {
                mainSlide();
            }

            setMouseUp('ok');
        }
        else if (mouseUp === 'ok') {
            setMouseDown(null);
            setMouseUp(null);
            setTouchStart(null);
            setTouchEnd(null);
        }
    }, [mouseUp]);

    const onMouseMoveSlideContainer = (e) => {
        if (mouseDown !== 'down') return;
        slideWrap.current.style.transition = 'none';
        slideWrap.current.style.transform = `translateX(${e.clientX - dragStart}px)`;
    }

    const onClickPageBtn = (e, n) => {
        e.preventDefault();
        setCnt(n);
    }

    return (
        <section
            id="section1"
            onMouseEnter={onMouseEnterSlideContainer}
            onMouseLeave={onMouseLeaveSlideContainer}
        >
            <div
                className="slide-container"
                onMouseDown={onMouseDownSlideContainer}
                onMouseMove={onMouseMoveSlideContainer}
            >
                <div className="slide-view">
                    <ul
                        className="slide-wrap"
                        ref={slideWrap}
                        onTransitionEnd={onTransitionEndEvent}
                    >
                        {
                            slide.메인슬라이드.map((item) =>
                                <li className={`slide ${item.클래스}`} key={item.글번호}>
                                    <a href="!#" title={item.타이틀}>
                                        <img src={item.이미지} alt={item.타이틀} />
                                        <h2><span>{item.타이틀}</span></h2>
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="link" id="link">
                <ul>
                    {link.바로가기.map((item, idx) => (
                        <li key={item.글번호}>
                            {
                                idx % 2 === 1 ? (
                                    <i></i>
                                ) : (
                                    item.이미지 ? ( // 이미지가 있는 경우만 렌더링
                                        <a href="#!" title={item.타이틀} onClick={(e) => e.preventDefault()}>
                                            <img src={item.이미지} alt={item.타이틀 || "이미지"} />
                                        </a>
                                    ) : (
                                        <span>{item.타이틀}</span> // 이미지가 없을 경우 대체 UI
                                    )
                                )
                            }
                        </li>
                    ))}
                </ul>
            </div>
            <div className="page-btn-box">
                <span>
                    {
                        page.map((item, idx) =>
                            <a
                                key={idx}
                                onClick={(e) => onClickPageBtn(e, idx)}
                                href="!#"
                                className={`page-btn1 blind${item ? ' on' : ''}`}
                            >버튼1</a>
                        )
                    }
                </span>
            </div>
        </section>
    );
}