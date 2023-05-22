const dropDown = document.querySelector('.dropdown__box')
const dropDownButton = document.querySelector('.dropdown')
const allDropDownItems = document.querySelectorAll('.dropdown__box-item')
const navMobile = document.querySelector('.nav__box')
const navButton = document.querySelector('.hamburger')
const allNavItems = document.querySelectorAll('.nav__box-item')
const allNavItemsClick = document.querySelectorAll('.click')


const handleDropDown = () => {
	dropDown.classList.toggle('dropdown__box--active')

	handleDropDownAnimation()
}

const handleNav = () => {
	navMobile.classList.toggle('nav__box--active')
	navButton.classList.toggle('is-active')

	allNavItemsClick.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('nav__box--active')
			navButton.classList.remove('is-active')
			dropDown.classList.remove('dropdown__box--active')
		})
	})
	navButton.addEventListener('click', () => {
		dropDown.classList.remove('dropdown__box--active')
	})
	handleNavItemsAnimation()
}

const handleNavItemsAnimation = () => {
	let delayTime = 0

	allNavItems.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}
const handleDropDownAnimation = () => {
	let delayTime = 0

	allDropDownItems.forEach(item => {
		item.classList.toggle('dropdown-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

dropDownButton.addEventListener('click', handleDropDown)
navButton.addEventListener('click', handleNav)
AOS.init({ disable: 'mobile' })