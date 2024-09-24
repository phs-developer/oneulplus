$(function () {
    let lastScroll = 0;
    // ------ event -----
    $(window).scroll(function () {
        const curr = $(window).scrollTop();
        curr > lastScroll ? $("#wrap").removeClass("up") : $("#wrap").addClass("up");
        curr > 64 ? $("#wrap").addClass("fixed") : $("#wrap").removeClass("fixed");

        lastScroll = curr;
    });

    $("#header .util button").click(function () {
        $("#gnb-menu").addClass("show");
    });
    $("#gnb-menu .gnb-head .btn-close").click(function () {
        $("#gnb-menu").removeClass("show");
    });
    $("#footer .btn-arrow").click(function () {
        $("#footer .group-info").toggleClass("off");
    });

    // ----- swiper ------
    new Swiper("#gnb-menu .section3 .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });

    const banner1Slide = new Swiper(".banner1 .swiper", {
        pagination: {
            el: ".pagination",
            type: "fraction",
        },
        slidesPerView: 1,
        autoplay: {
            delay: 3500,
        },
    });
    $(".banner1 .btn-auto").click(function () {
        if ($(".banner1 .btn-auto").hasClass("stop")) {
            banner1Slide.autoplay.stop();
            $(".banner1 .btn-auto").removeClass("stop").addClass("play");
            $(".banner1 .btn-auto .blind").text("자동재생 시작");
        } else {
            banner1Slide.autoplay.start();
            $(".banner1 .btn-auto").removeClass("play").addClass("stop");
            $(".banner1 .btn-auto .blind").text("자동재생 정지");
        }
    });

    new Swiper(".sc-best .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });

    new Swiper(".banner2 .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1,
    });

    new Swiper(".sc-deal .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });

    new Swiper(".sc-special1 .swiper", {
        slidesPerView: 2.5,
        spaceBetween: 20,
    });

    new Swiper(".sc-special2 .swiper", {
        slidesPerView: 2.5,
        spaceBetween: 20,
    });

    new Swiper(".sc-md .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1,
    });

    new Swiper(".sc-info .swiper", {
        pagination: {
            el: ".pagination",
        },
        slidesPerView: 1.3,
        spaceBetween: 10,
        slidesOffsetAfter: 25,
    });

    // ------ data -------
    async function getData(listName) {
        const res = await fetch("./assets/data/data.json");
        const json = await res.json();
        return json[listName];
    }

    getData("marketList").then((list) => {
        list.forEach((item) => {
            html = `
            <li class="cate-item">
                <a href="#">
                    <div class="img">
                        <img src="${item.thumb}" alt="${item.title}" />
                    </div>
                    <p>${item.title}</p>
                </a>
            </li>`;

            $(".section1 .cate-list").append(html);
        });
    });
    getData("brandList").then((list) => {
        list.forEach((item) => {
            html = `
            <li class="brand-item">
                <a href="#">
                    <img src="${item.icon}" alt />
                    <span class="title">${item.title}</span>
                </a>
            </li>`;

            $(".section2 .brand-list").append(html);
        });
    });
    getData("evnetList").then((list) => {
        list.forEach((item) => {
            html = `
            <div class="swiper-slide">
                <a href="#">
                    <img src="${item.thumb}" alt />
                    <p class="blind">
                        ${item.alt}
                    </p>
                </a>
            </div>`;

            $(".section3 .swiper-wrapper").append(html);
        });
    });
    getData("infoList").then((list) => {
        list.forEach((item) => {
            html = `
            <li class="info-item">
                <a href="">
                    <img src="${item.thumb}" alt />
                    <span class="title">${item.title}</span>
                </a>
            </li>
            `;

            $(".section4 .info-list").append(html);
        });
    });
    getData("talkList").then((list) => {
        list.forEach((item) => {
            html = `
            <li class="talk-item">
                <img src="${item.thumb}" alt />
                <p class="title">${item.title}</p>
            </li>
            `;

            $(".section5 .talk-list").append(html);
        });
    });
    getData("banner1").then((list) => {
        list.forEach((item) => {
            html = `
            <div class="swiper-slide">
                <a href="#">
                    <img src="${item.thumb}" alt />
                    <p class="blind">${item.title}</p>
                </a>
            </div>
            `;

            $(".banner1 .swiper-wrapper").append(html);
        });
    });
    getData("mainServiceList").then((list) => {
        list.forEach((item) => {
            html = `
            <li class="serv-item">
                <a href="#">
                    <img src="${item.icon}" alt />
                    <span class="title">${item.title}</span>
                </a>
            </li>
            `;

            $(".sc-main .serv-list").append(html);
        });
    });
    getData("bestList").then((list) => {
        list.forEach((_, idx) => {
            if (idx % 4 === 0) {
                let html = ``;
                for (let i = 0; i < 4; i++) {
                    html += `
                    <div class="item ${idx + i === 0 && "top"}">
                        <a href="#">
                            <div class="img">
                                <span class="rank">${idx + i + 1}</span>
                                <img src="${list[idx + i].thumb}" alt />
                            </div>
                            <div class="info">
                                <p class="title">${list[idx + i].title}</p>
                                <div class="price">
                                    <span class="sale">${list[idx + i].price.oriPrice}</span>
                                    <span class="discount">${list[idx + i].price.salePercent}<em>%</em></span>
                                    <span class="origin">${list[idx + i].price.salePrice}<em>원</em></span>
                                </div>
                            </div>
                        </a>
                        <button class="btn-cart">
                            <i class="ico-cart"></i>
                            <span class="blind">장바구니 담기</span>
                        </button>
                    </div>
                    `;
                }
                const swiperSlide = `
                <div class="swiper-slide">
                    ${html}
                </div>
                `;

                $(".sc-best .swiper-wrapper").append(swiperSlide);
            }
        });
    });
    getData("dealList").then((list) => {
        list.forEach((_, idx) => {
            if (idx % 4 === 0) {
                let html = ``;
                for (let i = 0; i < 4; i++) {
                    const deal = list[idx + i];
                    const deadlineId = `deadline-${idx + i}`;
                    const deadline = calculateDeadline(deal.deadline);

                    html += `
            <div class="item">
                <a href="#">
                    <div class="img">
                        <img src="${deal.thumb}" alt />
                    </div>
                    <div class="time">
                        <i class="ico-time"></i>
                            <span id="${deadlineId}">${deadline}</span>
                    </div>
                    <div class="info">
                        <p class="title">${deal.title}</p>
                        <div class="price">
                            <span class="sale">${deal.price.oriPrice}</span>
                            <span class="discount">${deal.price.salePercent}<em>%</em></span>
                            <span class="origin">${deal.price.salePrice}<em>원</em></span>
                        </div>
                    </div>
                </a>
                <button class="btn-cart">
                    <i class="ico-cart"></i>
                    <span class="blind">장바구니 담기</span>
                </button>
            </div>
            `;
                }
                const swiperSlide = `
        <div class="swiper-slide">
            ${html}
        </div>
        `;

                $(".sc-deal .swiper-wrapper").append(swiperSlide);
            }
        });

        setInterval(() => {
            list.forEach((_, idx) => {
                if (idx % 4 === 0) {
                    for (let i = 0; i < 4; i++) {
                        const deal = list[idx + i];
                        const deadlineId = `#deadline-${idx + i}`;
                        const updatedDeadline = calculateDeadline(deal.deadline);
                        $(deadlineId).text(updatedDeadline);
                    }
                }
            });
        }, 1000); // 1초마다 업데이트
    });
    getData("special1").then((list) => {
        list.forEach((item) => {
            html = `
            <div class="swiper-slide">
                <div class="item">
                    <a href="#">
                        <div class="img">
                            <img src="${item.thumb}" alt />
                        </div>
                        <div class="info">
                            <p class="title">${item.title}</p>
                            <div class="price">
                                <span class="sale">${item.price.oriPrice}</span>
                                <span class="discount">${item.price.salePercent}<em>%</em></span>
                                <span class="origin">${item.price.salePrice}<em>원</em></span>
                            </div>
                        </div>
                    </a>
                    <button class="btn-cart">
                        <i class="ico-cart"></i>
                        <span class="blind">장바구니 담기</span>
                    </button>
                </div>
            </div>
            `;

            $(".sc-special1 .swiper-wrapper").append(html);
        });
    });
    getData("mdList").then((list) => {
        list.forEach((_, idx) => {
            if (idx % 4 === 0) {
                let rowHtml = ``;
                let columnHtml = ``;
                for (let i = 0; i < 4; i++) {
                    const html = `
                    <div class="item">
                        <a href="#">
                            <div class="img">
                                <img src="${list[idx + i].thumb}" alt />
                            </div>
                            <div class="info">
                                <p class="title">${list[idx + i].title}</p>
                                <div class="price">
                                    <span class="sale">${list[idx + i].price.oriPrice}</span>
                                    <span class="discount">${list[idx + i].price.salePercent}<em>%</em></span>
                                    <span class="origin">${list[idx + i].price.salePrice}<em>원</em></span>
                                </div>
                            </div>
                        </a>
                        <button class="btn-cart">
                            <i class="ico-cart"></i>
                            <span class="blind">장바구니 담기</span>
                        </button>
                    </div>
                    `;
                    i < 2 ? (rowHtml += html) : (columnHtml += html);
                }

                const swiperSlide = `
                <div class="swiper-slide">
                    <div class="row">
                    ${rowHtml}
                    </div>
                    <div class="col">
                    ${columnHtml}
                    </div>
                </div>
                `;

                $(".sc-md .swiper-wrapper").append(swiperSlide);
            }
        });
    });
    getData("dealList").then((list) => {
        list.forEach((item, idx) => {
            if (idx < 7) {
                html = `
                <div class="swiper-slide">
                    <div class="item">
                        <a href="#">
                            <div class="img">
                                <img src="${item.thumb}" alt />
                            </div>
                            <div class="info">
                                <p class="title">${item.title}</p>
                                <div class="price">
                                    <span class="sale">${item.price.oriPrice}</span>
                                    <span class="discount">${item.price.salePercent}<em>%</em></span>
                                    <span class="origin">${item.price.salePrice}<em>원</em></span>
                                </div>
                            </div>
                        </a>
                        <button class="btn-cart">
                            <i class="ico-cart"></i>
                            <span class="blind">장바구니 담기</span>
                        </button>
                    </div>
                </div>
                `;
            }

            $(".sc-special2 .swiper-wrapper").append(html);
        });
    });
    getData("mainInfoList").then((list) => {
        list.forEach((item) => {
            html = `
                <div class="swiper-slide">
                    <a href="#">
                        <img src="${item.thumb}" alt />
                        <p class="blind">${item.alt}</p>
                    </a>
                </div>
                `;

            $(".sc-info .swiper-wrapper").append(html);
        });
    });

    function calculateDeadline(deadline) {
        const start = new Date();
        const end = new Date(deadline);
        const timeDiff = end - start;

        const days = Math.floor(timeDiff / 86400000); // 하루는 86400000 밀리초
        const hours = Math.floor((timeDiff % 86400000) / 3600000); // 한 시간은 3600000 밀리초
        const minutes = Math.floor((timeDiff % 3600000) / 60000); // 1분은 60000 밀리초
        const seconds = Math.floor((timeDiff % 60000) / 1000); // 1초는 1000 밀리초

        return `${days}일 ${hours}:${minutes}:${seconds}`;
    }
});
