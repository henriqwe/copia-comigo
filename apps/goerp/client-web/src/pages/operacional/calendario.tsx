export default function Page() {
  return <div />
}

// import rotas from '&erp/domains/routes'

// import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
// import * as templates from '@comigo/ui-templates'
// import MainMenuItems from '&erp/domains/MainMenuItems'
// import companies from '&erp/domains/companies'

// // import FullCalendar from '@fullcalendar/react'
// // import interactionPlugin from '@fullcalendar/interaction'
// // import timeGridPlugin from '@fullcalendar/timegrid'

// import dynamic from 'next/dynamic'

// export default function Calendario() {
//   return <ThemeProvider>
//     <Page />
//   </ThemeProvider>
// }

// export function Page() {
//     const { theme, changeTheme } = useTheme()
//   const FullCalendar = dynamic(
//     () => import('@comigo/ui-blocks').then(blocks => blocks.Calendar),
//     {
//       ssr: false
//     }
//   )
//   // ../../../domains/blocks/Calendar
//   return (
//     <templates.Base
// setTheme = { changeTheme }
//       MainMenuItems={MainMenuItems} rotas={rotas} companies={companies}
//       theme={theme}
//       title="Calendário 1"
//       noGrid={true}
//       currentLocation={[
//         { title: 'Rastreamento', url: rotas.home },
//         { title: 'Canlendário', url: rotas.operacional.calendario }
//       ]}
//     >
//       <>
//         <div className="grid grid-cols-12 gap-5 mt-5">
//           <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
//             <div className="p-5 box intro-y">
//               <button type="button" className="w-full mt-2 btn btn-primary">
//                 <i className="w-4 h-4 mr-2" data-feather="edit-3"></i> Agendar
//               </button>
//               <div
//                 className="py-3 mt-6 mb-5 border-t border-b border-gray-200 dark:border-dark-5"
//                 id="calendar-events"
//               >
//                 <div className="relative">
//                   <div className="flex items-center p-3 -mx-3 transition duration-300 ease-in-out rounded-md cursor-pointer event hover:bg-gray-200 dark:hover:bg-dark-1">
//                     <div className="w-2 h-2 mr-3 rounded-full bg-theme-11"></div>
//                     <div className="pr-10">
//                       <div className="truncate event__title">OS 001</div>
//                       <div className="text-gray-600 text-xs mt-0.5">
//                         <span className="event__days">2</span> Dias{' '}
//                         <span className="mx-1">•</span> 10:00 AM
//                       </div>
//                     </div>
//                   </div>
//                   <a
//                     className="absolute top-0 bottom-0 right-0 flex items-center my-auto"
//                     href=""
//                   >
//                     {' '}
//                     <i
//                       data-feather="edit"
//                       className="w-4 h-4 text-gray-600"
//                     ></i>{' '}
//                   </a>
//                 </div>
//                 <div className="relative">
//                   <div className="flex items-center p-3 -mx-3 transition duration-300 ease-in-out rounded-md cursor-pointer event hover:bg-gray-200 dark:hover:bg-dark-1">
//                     <div className="w-2 h-2 mr-3 rounded-full bg-theme-12"></div>
//                     <div className="pr-10">
//                       <div className="truncate event__title">OS 002</div>
//                       <div className="text-gray-600 text-xs mt-0.5">
//                         <span className="event__days">3</span> Dias{' '}
//                         <span className="mx-1">•</span> 07:00 AM
//                       </div>
//                     </div>
//                   </div>
//                   <a
//                     className="absolute top-0 bottom-0 right-0 flex items-center my-auto"
//                     href=""
//                   >
//                     {' '}
//                     <i
//                       data-feather="edit"
//                       className="w-4 h-4 text-gray-600"
//                     ></i>{' '}
//                   </a>
//                 </div>
//                 <div className="relative">
//                   <div className="flex items-center p-3 -mx-3 transition duration-300 ease-in-out rounded-md cursor-pointer event hover:bg-gray-200 dark:hover:bg-dark-1">
//                     <div className="w-2 h-2 mr-3 rounded-full bg-theme-11"></div>
//                     <div className="pr-10">
//                       <div className="truncate event__title">OS 003</div>
//                       <div className="text-gray-600 text-xs mt-0.5">
//                         <span className="event__days">4</span> Dias{' '}
//                         <span className="mx-1">•</span> 11:00 AM
//                       </div>
//                     </div>
//                   </div>
//                   <a
//                     className="absolute top-0 bottom-0 right-0 flex items-center my-auto"
//                     href=""
//                   >
//                     {' '}
//                     <i
//                       data-feather="edit"
//                       className="w-4 h-4 text-gray-600"
//                     ></i>{' '}
//                   </a>
//                 </div>
//                 <div
//                   className="hidden p-3 text-center text-gray-600"
//                   id="calendar-no-events"
//                 >
//                   Sem agendamnetos
//                 </div>
//               </div>
//               {/*<div className="form-check">*/}
//               {/*  <label className="form-check-label" htmlFor="checkbox-events">*/}
//               {/*    Remover após dropar*/}
//               {/*  </label>*/}
//               {/*  <input*/}
//               {/*    className="ml-auto show-code form-check-switch"*/}
//               {/*    type="checkbox"*/}
//               {/*    id="checkbox-events"*/}
//               {/*  />*/}
//               {/*</div>*/}
//             </div>
//             <div className="p-5 mt-5 box intro-y">
//               <div className="flex">
//                 <i
//                   data-feather="chevron-left"
//                   className="w-5 h-5 text-gray-600"
//                 ></i>
//                 <div className="mx-auto text-base font-medium">Abril</div>
//                 <i
//                   data-feather="chevron-right"
//                   className="w-5 h-5 text-gray-600"
//                 ></i>
//               </div>
//               <div className="grid grid-cols-7 gap-4 mt-5 text-center">
//                 <div className="font-medium">Su</div>
//                 <div className="font-medium">Mo</div>
//                 <div className="font-medium">Tu</div>
//                 <div className="font-medium">We</div>
//                 <div className="font-medium">Th</div>
//                 <div className="font-medium">Fr</div>
//                 <div className="font-medium">Sa</div>
//                 <div className="py-0.5 rounded relative text-gray-600">29</div>
//                 <div className="py-0.5 rounded relative text-gray-600">30</div>
//                 <div className="py-0.5 rounded relative text-gray-600">31</div>
//                 <div className="py-0.5 rounded relative">1</div>
//                 <div className="py-0.5 rounded relative">2</div>
//                 <div className="py-0.5 rounded relative">3</div>
//                 <div className="py-0.5 rounded relative">4</div>
//                 <div className="py-0.5 rounded relative">5</div>
//                 <div className="py-0.5 bg-theme-18 dark:bg-theme-9 rounded relative">
//                   6
//                 </div>
//                 <div className="py-0.5 rounded relative">7</div>
//                 <div className="py-0.5 bg-theme-1 dark:bg-theme-1 text-white rounded relative">
//                   8
//                 </div>
//                 <div className="py-0.5 rounded relative">9</div>
//                 <div className="py-0.5 rounded relative">10</div>
//                 <div className="py-0.5 rounded relative">11</div>
//                 <div className="py-0.5 rounded relative">12</div>
//                 <div className="py-0.5 rounded relative">13</div>
//                 <div className="py-0.5 rounded relative">14</div>
//                 <div className="py-0.5 rounded relative">15</div>
//                 <div className="py-0.5 rounded relative">16</div>
//                 <div className="py-0.5 rounded relative">17</div>
//                 <div className="py-0.5 rounded relative">18</div>
//                 <div className="py-0.5 rounded relative">19</div>
//                 <div className="py-0.5 rounded relative">20</div>
//                 <div className="py-0.5 rounded relative">21</div>
//                 <div className="py-0.5 rounded relative">22</div>
//                 <div className="py-0.5 bg-theme-17 dark:bg-theme-11 rounded relative">
//                   23
//                 </div>
//                 <div className="py-0.5 rounded relative">24</div>
//                 <div className="py-0.5 rounded relative">25</div>
//                 <div className="py-0.5 rounded relative">26</div>
//                 <div className="py-0.5 bg-theme-14 dark:bg-theme-12 rounded relative">
//                   27
//                 </div>
//                 <div className="py-0.5 rounded relative">28</div>
//                 <div className="py-0.5 rounded relative">29</div>
//                 <div className="py-0.5 rounded relative">30</div>
//                 <div className="py-0.5 rounded relative text-gray-600">1</div>
//                 <div className="py-0.5 rounded relative text-gray-600">2</div>
//                 <div className="py-0.5 rounded relative text-gray-600">3</div>
//                 <div className="py-0.5 rounded relative text-gray-600">4</div>
//                 <div className="py-0.5 rounded relative text-gray-600">5</div>
//                 <div className="py-0.5 rounded relative text-gray-600">6</div>
//                 <div className="py-0.5 rounded relative text-gray-600">7</div>
//                 <div className="py-0.5 rounded relative text-gray-600">8</div>
//                 <div className="py-0.5 rounded relative text-gray-600">9</div>
//               </div>
//               <div className="pt-5 mt-5 border-t border-gray-200 dark:border-dark-5">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 mr-3 rounded-full bg-theme-11"></div>
//                   <span className="truncate">Dia da independência</span>
//                   <div className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"></div>
//                   <span className="font-medium xl:ml-auto">23th</span>
//                 </div>
//                 <div className="flex items-center mt-4">
//                   <div className="w-2 h-2 mr-3 rounded-full bg-theme-1 dark:bg-theme-10"></div>
//                   <span className="truncate">Dia do memorial</span>
//                   <div className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"></div>
//                   <span className="font-medium xl:ml-auto">10th</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
//             <div className="p-5 box">
//               <div className="full-calendar" id="calendar">
//                 <FullCalendar />
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     </templates.Base>
//   )
// }
