// import dynamic from 'next/dynamic'

// import * as flowStages from '&crm/domains/services/Registration/Flows/Stage'
// import * as flows from '&crm/domains/services/Registration/Flows'
// import * as tickets from '&crm/domains/services/Tickets'
// import * as common from '@comigo/ui-common'

// import rotas from '&crm/domains/routes'
// import MainMenuItems from '&crm/domains/MainMenuItems'
// import companies from '&crm/domains/companies'

// import * as templates from '@comigo/ui-templates'
// import { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { capitalizeAllWord } from '&crm/utils/formaters'
// import { useRouter } from 'next/router'

// import * as utils from '@comigo/utils'
// import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

// type Flow =
//   | {
//       Id: string
//       Etapas: {
//         Id: string
//         Nome: string
//         Fluxo: {
//           Id: string
//           Nome: string
//         }
//         Tickets: {
//           Id: string
//           Lead: {
//             Id: string
//             Nome: string
//           }
//           Usuario: {
//             Id: string
//             Colaborador?:
//               | {
//                   Pessoa: {
//                     Nome: string
//                   }
//                 }
//               | undefined
//           }
//         }[]
//         Posicao: number
//       }[]
//     }
//   | undefined

export default function Combos() {
  return (
    <div/>
    // <flowStages.StageProvider>
    //   <flows.FlowProvider>
    //     <tickets.TicketProvider>
    //       <ThemeProvider>
    //         {' '}
    //         <Page />{' '}
    //       </ThemeProvider>
    //     </tickets.TicketProvider>
    //   </flows.FlowProvider>
    // </flowStages.StageProvider>
  )
}

// export function Page() {
//   const router = useRouter()
//   const [flowArray, setFlowArray] = useState<Flow>()
//   const [ticketId, setTicketId] = useState('')
//   const [ticketName, setTicketName] = useState('')
//   const [openModal, setOpenModal] = useState(false)
//   const { theme, changeTheme } = useTheme()

//   //const { usuario } = useUsuario()
//   const {
//     changeTicketFlowStage,
//     // changeTicketFlowStageLoading,
//     stagesRefetch,
//     getFlowById
//   } = flowStages.useStage()
//   const { flowsData, flowsRefetch } = flows.useFlow()
//   const {
//     setSlidePanelState,
//     slidePanelState,
//     softDeleteTicket,
//     softDeleteTicketLoading
//   } = tickets.useTicket()
//   const { control, watch } = useForm()
//   const Board = dynamic(() => import('@lourenci/react-kanban'))
//   const board2 = {
//     columns: flowArray?.Etapas
//       ? flowArray.Etapas?.map((stage) => {
//           return {
//             id: stage.Id,
//             title: stage.Nome,
//             cards: stage.Tickets.filter((ticket) => ticket.Lead !== null).map(
//               (ticket) => {
//                 return {
//                   id: ticket.Id,
//                   title: ticket.Lead.Nome,
//                   description: capitalizeAllWord(
//                     ticket.Usuario.Colaborador?.Pessoa.Nome as string
//                   )
//                 }
//               }
//             )
//           }
//         })
//       : []
//   }

//   async function deleteSelectedTicket() {
//     await softDeleteTicket({
//       variables: {
//         Id: ticketId
//       }
//     })
//       .then(() => {
//         flowsRefetch()
//         setOpenModal(false)
//       })
//       .catch((err) => utils.showError(err))
//   }

//   useEffect(() => {
//     flowsRefetch()
//   }, [flowsRefetch, slidePanelState.open])

//   useEffect(() => {
//     if (watch('Fluxo_Id')) {
//       getFlowById(watch('Fluxo_Id').key).then((flows) => {
//         setFlowArray(flows)
//       })
//     }
//   }, [watch('Fluxo_Id'), flowsData])

//   return (
//     <templates.Base
//       setTheme={changeTheme}
//       theme={theme}
//       MainMenuItems={MainMenuItems['erp']}
//       rotas={rotas['erp']}
//       companies={companies}
//       title="Kanban"
//       imageUrl={'/imagens/logoAssistencia.png'}
//       currentLocation={[
//         { title: 'Rastreamento', url: rotas.home },
//         { title: 'Kanban', url: rotas.comercial.index }
//       ]}
//     >
//       <div className="col-span-12">
//         <div className="flex items-center justify-center w-full gap-4">
//           <Controller
//             control={control}
//             name="Fluxo_Id"
//             render={({ field: { onChange, value } }) => (
//               <div className="flex-1">
//                 <common.form.Select
//                   itens={
//                     flowsData
//                       ? flowsData.map((item) => {
//                           return {
//                             key: item.Id,
//                             title: item.Nome
//                           }
//                         })
//                       : []
//                   }
//                   value={value}
//                   onChange={onChange}
//                   label="Fluxo"
//                 />
//               </div>
//             )}
//           />
//           {watch('Fluxo_Id') !== undefined && (
//             <common.buttons.SecondaryButton
//               handler={() => setSlidePanelState({ open: true, type: 'create' })}
//               title="Adicionar Ticket"
//               disabled={board2.columns.length === 0}
//             />
//           )}
//         </div>

//         {board2.columns.length === 0 && watch('Fluxo_Id') !== undefined && (
//           <div className="flex flex-col items-center justify-center w-full mt-10">
//             <h1 className="mb-2 text-xl">
//               Cadastre pelo menos uma etapa para o fluxo selecionado
//             </h1>
//             <common.buttons.SecondaryButton
//               handler={() =>
//                 router.push(rotas.atendimento.cadastros.fluxos.etapas)
//               }
//               title="Cadastrar etapa"
//             />
//           </div>
//         )}

//         <Board
//           allowRemoveCard={false}
//           disableColumnDrag
//           onCardRemove={console.log}
//           initialBoard={board2}
//           onNewCardConfirm={(draftCard) => ({
//             id: new Date().getTime(),
//             ...draftCard
//           })}
//           onCardDragEnd={(board, card, source, destination) => {
//             if (source.fromColumnId !== destination.toColumnId) {
//               changeTicketFlowStage({
//                 variables: {
//                   Id: card.id,
//                   Etapa_Id: destination.toColumnId
//                 }
//               }).then(async () => {
//                 stagesRefetch()
//                 await getFlowById(watch('Fluxo_Id').key).then((flows) => {
//                   setFlowArray(flows)
//                 })
//               })
//             }
//           }}
//           onCardNew={(card) => console.log(card)}
//           // renderColumnHeader={(
//           //   { title },
//           //   { removeColumn, renameColumn, addCard }
//           // ) => (
//           //   <div className="bg-primary-1">
//           //     {title}
//           //     <button type="button" onClick={removeColumn}>
//           //       Remove Column
//           //     </button>
//           //     <button type="button" onClick={() => renameColumn('New title')}>
//           //       Rename Column
//           //     </button>
//           //     <button
//           //       type="button"
//           //       onClick={() => addCard({ id: 99, title: 'New Card' })}
//           //     >
//           //       Add Card
//           //     </button>
//           //   </div>
//           // )}
//           renderCard={(item, { dragging }) => (
//             <div dragging={dragging} className="react-kanban-card">
//               <p className="react-kanban-card__title">
//                 {item.title}{' '}
//                 <span className="flex items-center">
//                   <span
//                     onClick={() => {
//                       setTicketId(item.id)
//                       setSlidePanelState({ open: true, type: 'view' })
//                     }}
//                     className="cursor-pointer"
//                   >
//                     <common.icons.ConfigIcon />
//                   </span>
//                   <span
//                     onClick={() => {
//                       setTicketId(item.id)
//                       setTicketName(item.title)
//                       setOpenModal(true)
//                     }}
//                     className="cursor-pointer"
//                   >
//                     <common.icons.DeleteIcon />
//                   </span>
//                 </span>
//               </p>
//               <p className="react-kanban-card__description">
//                 {item.description}
//               </p>
//             </div>
//           )}
//           // renderColumnAdder={({ addColumn }) => (
//           //   <div
//           //     onClick={() => addColumn({ id: '', title: 'Title', cards: [] })}
//           //   >
//           //     Add column
//           //   </div>
//           // )}
//         />
//       </div>
//       <tickets.SlidePanel
//         Flow={watch('Fluxo_Id')}
//         FlowStage={{
//           key: flowArray?.Etapas[0]?.Id as string,
//           title: flowArray?.Etapas[0]?.Nome as string
//         }}
//         TicketType={{ key: 'comercial', title: 'Comercial' }}
//         TicketId={ticketId}
//       />
//       <common.Modal
//         handleSubmit={deleteSelectedTicket}
//         open={openModal}
//         disabled={softDeleteTicketLoading}
//         description={`Deseja mesmo excluir o ticket ${ticketName}?`}
//         onClose={() => setOpenModal(false)}
//         buttonTitle={`Excluir ticket`}
//         modalTitle={`Excluir o ticket ${ticketName}?`}
//         color="red"
//       />
//     </templates.Base>
//   )
// }
