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
		});
	
	trigger.add("section, footer");

	navLi[4].addEventListener("click", function(e){
		e.preventDefault();
		targety=pageList[pageList.length-1].offsetTop;
		gsap.to(window, {scrollTo: targety, duration: 0.5});
	});
});