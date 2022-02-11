export function handleClickScrollToCardPath(index: string, refsPathVehicle) {
  refsPathVehicle.current[index]['elem']?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  refsPathVehicle.current[index]['elem'].firstChild.children[1].classList.add(
    'border-2',
    'border-yellow-500'
  )

  setTimeout(() => {
    refsPathVehicle.current[index][
      'elem'
    ].firstChild.children[1].classList.remove('border-2', 'border-yellow-500')
  }, 3000)
}
