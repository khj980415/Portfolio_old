window.addEventListener("load", () => {
    let cursor=document.querySelector(".mouse_cursor");

	let header=document.getElementById("header");
	let nav=header.lastElementChild;
	let navLi=nav.firstElementChild.children;
	let pageList=[];
	let section=document.querySelectorAll("section");
	let footer=document.getElementById("footer");
	let targety=0;

    navLi[3].firstElementChild.classList.add("active");

	for(let i=0; i<section.length; i++){
		pageList.push(section[i]);
	}
	pageList.push(footer);
	

	document.body.addEventListener("mousemove", function(e){
		gsap.to(cursor, {left: e.pageX-5, top: e.pageY-5, duration: 0.2})
	});

    const trigger=new ScrollTrigger.default({
		trigger: { //  추가 클래스와 반응 위치
				once: true,
				offset: {
					viewport: {
						x: 0,
						y: 0.25 // 윈도우 3/4 지점에서 발생
					}
				},
				toggle: {
					class: {
						in: "active",
						out: "inactive"
					}
				},
			},
		scroll: { // 페이지 번호를 JavaScript로 받기 위한 
					callback: offset => scrollInteraction(offset.y)
				}
		});
	
	trigger.add("section, footer");

	let n=0;
	
	function scrollInteraction(t){
		if(t<pageList[1].offsetTop){
			n=0;
		}
		else if (t < pageList[2].offsetTop){
			n=1;
		}
		else if (t < pageList[3].offsetTop){
			n=2;
		}
		else if (t < pageList[4].offsetTop){
			n=3;
			if( window.innerHeight+t === document.body.scrollHeight){
				n=4;
			}
		}
		else {
			n=4;
		}
	}

	navLi[4].addEventListener("click", function(e){
		e.preventDefault();
		targety=pageList[pageList.length-1].offsetTop;
		gsap.to(window, {scrollTo: targety, duration: 0.5});
	});
	
    const mainSwiper = new Swiper(".mainSwiper", {
        slidesPerView: 1,
		breakpoints: {
			920: {
				slidesPerView: 3,
        spaceBetween: 30,
			},
		},
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
    });
});