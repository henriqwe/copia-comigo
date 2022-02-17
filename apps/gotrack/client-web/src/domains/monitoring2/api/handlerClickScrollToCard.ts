export function handleClickScrollToCardPath(index: string, refsPathVehicle) {
  refsPathVehicle.current[index]['elem']?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  refsPathVehicle.current[index]['elem'].firstChild.children[1].classList.add(
    '!bg-yellow-50'
  )

  setTimeout(() => {
    refsPathVehicle.current[index][
      'elem'
    ].firstChild.children[1].classList.remove('!bg-yellow-50')
  }, 3000)
}
