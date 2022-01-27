
export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="main">
        
        <div className="mobile-menu md:hidden">
            <div className="mobile-menu-bar">
                <a href="" className="flex mr-auto">
                    <img alt="Icewall Tailwind HTML Admin Template" className="w-6" src="dist/images/logo.svg"/>
                </a>
                <a href="javascript:;" id="mobile-menu-toggler"> <i data-feather="bar-chart-2" className="w-8 h-8 text-white transform -rotate-90"></i> </a>
            </div>
            <ul className="border-t border-white/[0.08] py-5 hidden">
                <li>
                    <a href="javascript:;.html" className="menu menu--active">
                        <div className="menu__icon"> <i data-feather="home"></i> </div>
                        <div className="menu__title"> Dashboard <i data-feather="chevron-down" className="menu__sub-icon transform rotate-180"></i> </div>
                    </a>
                    <ul className="menu__sub-open">
                        <li>
                            <a href="index.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 1 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-dashboard-overview-2.html" className="menu menu--active">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 2 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-dashboard-overview-3.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 3 </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="box"></i> </div>
                        <div className="menu__title"> Menu Layout <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="index.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Side Menu </div>
                            </a>
                        </li>
                        <li>
                            <a href="simple-menu-light-dashboard-overview-1.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Simple Menu </div>
                            </a>
                        </li>
                        <li>
                            <a href="top-menu-light-dashboard-overview-1.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Top Menu </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="side-menu-light-inbox.html" className="menu">
                        <div className="menu__icon"> <i data-feather="inbox"></i> </div>
                        <div className="menu__title"> Inbox </div>
                    </a>
                </li>
                <li>
                    <a href="side-menu-light-file-manager.html" className="menu">
                        <div className="menu__icon"> <i data-feather="hard-drive"></i> </div>
                        <div className="menu__title"> File Manager </div>
                    </a>
                </li>
                <li>
                    <a href="side-menu-light-point-of-sale.html" className="menu">
                        <div className="menu__icon"> <i data-feather="credit-card"></i> </div>
                        <div className="menu__title"> Point of Sale </div>
                    </a>
                </li>
                <li>
                    <a href="side-menu-light-chat.html" className="menu">
                        <div className="menu__icon"> <i data-feather="message-square"></i> </div>
                        <div className="menu__title"> Chat </div>
                    </a>
                </li>
                <li>
                    <a href="side-menu-light-post.html" className="menu">
                        <div className="menu__icon"> <i data-feather="file-text"></i> </div>
                        <div className="menu__title"> Post </div>
                    </a>
                </li>
                <li>
                    <a href="side-menu-light-calendar.html" className="menu">
                        <div className="menu__icon"> <i data-feather="calendar"></i> </div>
                        <div className="menu__title"> Calendar </div>
                    </a>
                </li>
                <li className="menu__devider my-6"></li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="edit"></i> </div>
                        <div className="menu__title"> Crud <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-crud-data-list.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Data List </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-crud-form.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Form </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="users"></i> </div>
                        <div className="menu__title"> Users <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-users-layout-1.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Layout 1 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-users-layout-2.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Layout 2 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-users-layout-3.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Layout 3 </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="trello"></i> </div>
                        <div className="menu__title"> Profile <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-profile-overview-1.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 1 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-profile-overview-2.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 2 </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-profile-overview-3.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overview 3 </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="layout"></i> </div>
                        <div className="menu__title"> Pages <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Wizards <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-wizard-layout-1.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 1</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wizard-layout-2.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 2</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wizard-layout-3.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 3</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Blog <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-blog-layout-1.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 1</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-blog-layout-2.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 2</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-blog-layout-3.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 3</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Pricing <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-pricing-layout-1.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 1</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-pricing-layout-2.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 2</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Invoice <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-invoice-layout-1.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 1</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-invoice-layout-2.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 2</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> FAQ <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-faq-layout-1.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 1</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-faq-layout-2.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 2</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-faq-layout-3.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Layout 3</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="login-light-login.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Login </div>
                            </a>
                        </li>
                        <li>
                            <a href="login-light-register.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Register </div>
                            </a>
                        </li>
                        <li>
                            <a href="main-light-error-page.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Error Page </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-update-profile.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Update profile </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-change-password.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Change Password </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="menu__devider my-6"></li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="inbox"></i> </div>
                        <div className="menu__title"> Components <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Table <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-regular-table.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Regular Table</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-tabulator.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Tabulator</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Overlay <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-modal.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Modal</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-slide-over.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Slide Over</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-notification.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Notification</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="side-menu-light-accordion.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Accordion </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-button.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Button </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-alert.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Alert </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-progress-bar.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Progress Bar </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-tooltip.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Tooltip </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-dropdown.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Dropdown </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-typography.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Typography </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-icon.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Icon </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-loading-icon.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Loading Icon </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="sidebar"></i> </div>
                        <div className="menu__title"> Forms <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-regular-form.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Regular Form </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-datepicker.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Datepicker </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-tom-select.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Tom Select </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-file-upload.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> File Upload </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Wysiwyg Editor <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-wysiwyg-editor-classNameic.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">classNameic</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wysiwyg-editor-inline.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Inline</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wysiwyg-editor-balloon.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Balloon</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wysiwyg-editor-balloon-block.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Balloon Block</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-wysiwyg-editor-document.html" className="menu">
                                        <div className="menu__icon"> <i data-feather="zap"></i> </div>
                                        <div className="menu__title">Document</div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="side-menu-light-validation.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Validation </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;" className="menu">
                        <div className="menu__icon"> <i data-feather="hard-drive"></i> </div>
                        <div className="menu__title"> Widgets <i data-feather="chevron-down" className="menu__sub-icon "></i> </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-chart.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Chart </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-slider.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Slider </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-image-zoom.html" className="menu">
                                <div className="menu__icon"> <i data-feather="activity"></i> </div>
                                <div className="menu__title"> Image Zoom </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
        
        <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
            <div className="h-full flex items-center">
                
                <a href="" className="-intro-x hidden md:flex">
                    <img alt="Icewall Tailwind HTML Admin Template" className="w-6" src="dist/images/logo.svg"/>
                    <span className="text-white text-lg ml-3"> Icewall </span> 
                </a>
                
                
                <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
                    <ol className="breadcrumb breadcrumb-light">
                        <li className="breadcrumb-item"><a href="#">Application</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
                
                
                <div className="intro-x relative mr-3 sm:mr-6">
                    <div className="search hidden sm:block">
                        <input type="text" className="search__input form-control border-transparent" placeholder="Search..."/>
                        <i data-feather="search" className="search__icon dark:text-slate-500"></i> 
                    </div>
                    <a className="notification notification--light sm:hidden" href=""> <i data-feather="search" className="notification__icon dark:text-slate-500"></i> </a>
                    <div className="search-result">
                        <div className="search-result__content">
                            <div className="search-result__content__title">Pages</div>
                            <div className="mb-5">
                                <a href="" className="flex items-center">
                                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-feather="inbox"></i> </div>
                                    <div className="ml-3">Mail Settings</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-feather="users"></i> </div>
                                    <div className="ml-3">Users & Permissions</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-feather="credit-card"></i> </div>
                                    <div className="ml-3">Transactions Report</div>
                                </a>
                            </div>
                            <div className="search-result__content__title">Users</div>
                            <div className="mb-5">
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-9.jpg"/>
                                    </div>
                                    <div className="ml-3">Angelina Jolie</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">angelinajolie@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-13.jpg"/>
                                    </div>
                                    <div className="ml-3">Kevin Spacey</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">kevinspacey@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-7.jpg"/>
                                    </div>
                                    <div className="ml-3">Russell Crowe</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">russellcrowe@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-14.jpg"/>
                                    </div>
                                    <div className="ml-3">Edward Norton</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">edwardnorton@left4code.com</div>
                                </a>
                            </div>
                            <div className="search-result__content__title">Products</div>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-3.jpg"/>
                                </div>
                                <div className="ml-3">Nike Air Max 270</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Sport &amp; Outdoor</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-9.jpg"/>
                                </div>
                                <div className="ml-3">Nike Tanjun</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Sport &amp; Outdoor</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-14.jpg"/>
                                </div>
                                <div className="ml-3">Samsung Q90 QLED TV</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Electronic</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-3.jpg"/>
                                </div>
                                <div className="ml-3">Sony A7 III</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                            </a>
                        </div>
                    </div>
                </div>
                
                
                <div className="intro-x dropdown mr-4 sm:mr-6">
                    <div className="dropdown-toggle notification notification--bullet cursor-pointer" role="button" aria-expanded="false" data-tw-toggle="dropdown"> <i data-feather="bell" className="notification__icon dark:text-slate-500"></i> </div>
                    <div className="notification-content pt-2 dropdown-menu">
                        <div className="notification-content__box dropdown-content">
                            <div className="notification-content__title">Notifications</div>
                            <div className="cursor-pointer relative flex items-center ">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-9.jpg"/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript:;" className="font-medium truncate mr-5">Angelina Jolie</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-13.jpg"/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript:;" className="font-medium truncate mr-5">Kevin Spacey</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-7.jpg"/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript:;" className="font-medium truncate mr-5">Russell Crowe</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-14.jpg"/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript:;" className="font-medium truncate mr-5">Edward Norton</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-8.jpg"/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript:;" className="font-medium truncate mr-5">Arnold Schwarzenegger</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="intro-x dropdown w-8 h-8">
                    <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-4.jpg"/>
                    </div>
                    <div className="dropdown-menu w-56">
                        <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                            <li className="p-2">
                                <div className="font-medium">Angelina Jolie</div>
                                <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">DevOps Engineer</div>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-feather="user" className="w-4 h-4 mr-2"></i> Profile </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-feather="edit" className="w-4 h-4 mr-2"></i> Add Account </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-feather="lock" className="w-4 h-4 mr-2"></i> Reset Password </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-feather="help-circle" className="w-4 h-4 mr-2"></i> Help </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-feather="toggle-right" className="w-4 h-4 mr-2"></i> Logout </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div className="wrapper">
            <div className="wrapper-box">
                
                <nav className="side-nav">
                    <ul>
                        <li>
                            <a href="javascript:;.html" className="side-menu side-menu--active">
                                <div className="side-menu__icon"> <i data-feather="home"></i> </div>
                                <div className="side-menu__title">
                                    Dashboard 
                                    <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="side-menu__sub-open">
                                <li>
                                    <a href="index.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 1 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-dashboard-overview-2.html" className="side-menu side-menu--active">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 2 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-dashboard-overview-3.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 3 </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="box"></i> </div>
                                <div className="side-menu__title">
                                    Menu Layout 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="index.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Side Menu </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="simple-menu-light-dashboard-overview-1.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Simple Menu </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="top-menu-light-dashboard-overview-1.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Top Menu </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="side-menu-light-inbox.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="inbox"></i> </div>
                                <div className="side-menu__title"> Inbox </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-file-manager.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="hard-drive"></i> </div>
                                <div className="side-menu__title"> File Manager </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-point-of-sale.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="credit-card"></i> </div>
                                <div className="side-menu__title"> Point of Sale </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-chat.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="message-square"></i> </div>
                                <div className="side-menu__title"> Chat </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-post.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="file-text"></i> </div>
                                <div className="side-menu__title"> Post </div>
                            </a>
                        </li>
                        <li>
                            <a href="side-menu-light-calendar.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="calendar"></i> </div>
                                <div className="side-menu__title"> Calendar </div>
                            </a>
                        </li>
                        <li className="side-nav__devider my-6"></li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="edit"></i> </div>
                                <div className="side-menu__title">
                                    Crud 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-crud-data-list.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Data List </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-crud-form.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Form </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="users"></i> </div>
                                <div className="side-menu__title">
                                    Users 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-users-layout-1.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Layout 1 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-users-layout-2.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Layout 2 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-users-layout-3.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Layout 3 </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="trello"></i> </div>
                                <div className="side-menu__title">
                                    Profile 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-profile-overview-1.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 1 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-profile-overview-2.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 2 </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-profile-overview-3.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Overview 3 </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="layout"></i> </div>
                                <div className="side-menu__title">
                                    Pages 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Wizards 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-wizard-layout-1.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wizard-layout-2.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wizard-layout-3.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Blog 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-blog-layout-1.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-blog-layout-2.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-blog-layout-3.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Pricing 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-pricing-layout-1.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-pricing-layout-2.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Invoice 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-invoice-layout-1.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-invoice-layout-2.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            FAQ 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-faq-layout-1.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-faq-layout-2.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-faq-layout-3.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="login-light-login.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Login </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="login-light-register.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Register </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="main-light-error-page.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Error Page </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-update-profile.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Update profile </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-change-password.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Change Password </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="side-nav__devider my-6"></li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="inbox"></i> </div>
                                <div className="side-menu__title">
                                    Components 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Table 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-regular-table.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Regular Table</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-tabulator.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Tabulator</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Overlay 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-modal.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Modal</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-slide-over.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Slide Over</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-notification.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Notification</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="side-menu-light-accordion.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Accordion </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-button.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Button </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-alert.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Alert </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-progress-bar.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Progress Bar </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-tooltip.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Tooltip </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-dropdown.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Dropdown </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-typography.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Typography </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-icon.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Icon </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-loading-icon.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Loading Icon </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="sidebar"></i> </div>
                                <div className="side-menu__title">
                                    Forms 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-regular-form.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Regular Form </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-datepicker.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Datepicker </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-tom-select.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Tom Select </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-file-upload.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> File Upload </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title">
                                            Wysiwyg Editor 
                                            <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a href="side-menu-light-wysiwyg-editor-classNameic.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">classNameic</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wysiwyg-editor-inline.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Inline</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wysiwyg-editor-balloon.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Balloon</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wysiwyg-editor-balloon-block.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Balloon Block</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="side-menu-light-wysiwyg-editor-document.html" className="side-menu">
                                                <div className="side-menu__icon"> <i data-feather="zap"></i> </div>
                                                <div className="side-menu__title">Document</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="side-menu-light-validation.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Validation </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;" className="side-menu">
                                <div className="side-menu__icon"> <i data-feather="hard-drive"></i> </div>
                                <div className="side-menu__title">
                                    Widgets 
                                    <div className="side-menu__sub-icon "> <i data-feather="chevron-down"></i> </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a href="side-menu-light-chart.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Chart </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-slider.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Slider </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="side-menu-light-image-zoom.html" className="side-menu">
                                        <div className="side-menu__icon"> <i data-feather="activity"></i> </div>
                                        <div className="side-menu__title"> Image Zoom </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                
                
                <div className="content">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 2xl:col-span-9">
                            <div className="grid grid-cols-12 gap-6">
                                
                                <div className="col-span-12 mt-8">
                                    <div className="intro-y flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            General Report
                                        </h2>
                                        <a href="" className="ml-auto flex items-center text-primary"> <i data-feather="refresh-ccw" className="w-4 h-4 mr-3"></i> Reload Data </a>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex">
                                                        <i data-feather="shopping-cart" className="report-box__icon text-primary"></i> 
                                                        <div className="ml-auto">
                                                            <div className="report-box__indicator bg-success tooltip cursor-pointer" title="33% Higher than last month"> 33% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-3xl font-medium leading-8 mt-6">4.710</div>
                                                    <div className="text-base text-slate-500 mt-1">Item Sales</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex">
                                                        <i data-feather="credit-card" className="report-box__icon text-pending"></i> 
                                                        <div className="ml-auto">
                                                            <div className="report-box__indicator bg-danger tooltip cursor-pointer" title="2% Lower than last month"> 2% <i data-feather="chevron-down" className="w-4 h-4 ml-0.5"></i> </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-3xl font-medium leading-8 mt-6">3.721</div>
                                                    <div className="text-base text-slate-500 mt-1">New Orders</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex">
                                                        <i data-feather="monitor" className="report-box__icon text-warning"></i> 
                                                        <div className="ml-auto">
                                                            <div className="report-box__indicator bg-success tooltip cursor-pointer" title="12% Higher than last month"> 12% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-3xl font-medium leading-8 mt-6">2.149</div>
                                                    <div className="text-base text-slate-500 mt-1">Total Products</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex">
                                                        <i data-feather="user" className="report-box__icon text-success"></i> 
                                                        <div className="ml-auto">
                                                            <div className="report-box__indicator bg-success tooltip cursor-pointer" title="22% Higher than last month"> 22% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-3xl font-medium leading-8 mt-6">152.040</div>
                                                    <div className="text-base text-slate-500 mt-1">Unique Visitor</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 lg:col-span-6 mt-8">
                                    <div className="intro-y block sm:flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Sales Report
                                        </h2>
                                        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                                            <i data-feather="calendar" className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"></i> 
                                            <input type="text" className="datepicker form-control sm:w-56 box pl-10"/>
                                        </div>
                                    </div>
                                    <div className="intro-y box p-5 mt-12 sm:mt-5">
                                        <div className="flex flex-col xl:flex-row xl:items-center">
                                            <div className="flex">
                                                <div>
                                                    <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">$15,000</div>
                                                    <div className="mt-0.5 text-slate-500">This Month</div>
                                                </div>
                                                <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
                                                <div>
                                                    <div className="text-slate-500 text-lg xl:text-xl font-medium">$10,000</div>
                                                    <div className="mt-0.5 text-slate-500">Last Month</div>
                                                </div>
                                            </div>
                                            <div className="dropdown xl:ml-auto mt-5 xl:mt-0">
                                                <button className="dropdown-toggle btn btn-outline-secondary font-normal" aria-expanded="false" data-tw-toggle="dropdown"> Filter by Category <i data-feather="chevron-down" className="w-4 h-4 ml-2"></i> </button>
                                                <div className="dropdown-menu w-40">
                                                    <ul className="dropdown-content overflow-y-auto h-32">
                                                        <li><a href="" className="dropdown-item">PC & Laptop</a></li>
                                                        <li><a href="" className="dropdown-item">Smartphone</a></li>
                                                        <li><a href="" className="dropdown-item">Electronic</a></li>
                                                        <li><a href="" className="dropdown-item">Photography</a></li>
                                                        <li><a href="" className="dropdown-item">Sport</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="report-chart">
                                            <canvas id="report-line-chart" height="169" className="mt-6"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                                    <div className="intro-y flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Weekly Top Seller
                                        </h2>
                                        <a href="" className="ml-auto text-primary truncate">Show More</a> 
                                    </div>
                                    <div className="intro-y box p-5 mt-5">
                                        <canvas className="mt-3" id="report-pie-chart" height="300"></canvas>
                                        <div className="mt-8">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                <span className="truncate">17 - 30 Years old</span> <span className="font-medium xl:ml-auto">62%</span> 
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                                <span className="truncate">31 - 50 Years old</span> <span className="font-medium xl:ml-auto">33%</span> 
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                                <span className="truncate">  50 Years old</span> <span className="font-medium xl:ml-auto">10%</span> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                                    <div className="intro-y flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Sales Report
                                        </h2>
                                        <a href="" className="ml-auto text-primary truncate">Show More</a> 
                                    </div>
                                    <div className="intro-y box p-5 mt-5">
                                        <canvas className="mt-3" id="report-donut-chart" height="300"></canvas>
                                        <div className="mt-8">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                <span className="truncate">17 - 30 Years old</span> <span className="font-medium xl:ml-auto">62%</span> 
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                                <span className="truncate">31 - 50 Years old</span> <span className="font-medium xl:ml-auto">33%</span> 
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                                <span className="truncate"> 50 Years old</span> <span className="font-medium xl:ml-auto">10%</span> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 xl:col-span-8 mt-6">
                                    <div className="intro-y block sm:flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Official Store
                                        </h2>
                                        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                                            <i data-feather="map-pin" className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"></i> 
                                            <input type="text" className="form-control sm:w-40 box pl-10" placeholder="Filter by city"/>
                                        </div>
                                    </div>
                                    <div className="intro-y box p-5 mt-12 sm:mt-5">
                                        <div>250 Official stores in 21 countries, click the marker to see location details.</div>
                                        <div className="report-maps mt-5 bg-slate-200 rounded-md" data-center="-6.2425342, 106.8626478" data-sources="/dist/json/location.json"></div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 xl:col-span-4 mt-6">
                                    <div className="intro-y flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Weekly Best Sellers
                                        </h2>
                                    </div>
                                    <div className="mt-5">
                                        <div className="intro-y">
                                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                    <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-3.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">John Travolta</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">1 November 2021</div>
                                                </div>
                                                <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                            </div>
                                        </div>
                                        <div className="intro-y">
                                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                    <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-8.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Morgan Freeman</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">21 August 2022</div>
                                                </div>
                                                <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                            </div>
                                        </div>
                                        <div className="intro-y">
                                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                    <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-12.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Angelina Jolie</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">29 April 2022</div>
                                                </div>
                                                <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                            </div>
                                        </div>
                                        <div className="intro-y">
                                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                    <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-5.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">John Travolta</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">8 January 2022</div>
                                                </div>
                                                <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                            </div>
                                        </div>
                                        <a href="" className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500">View More</a> 
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
                                    <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                                        <div className="box p-5 zoom-in">
                                            <div className="flex items-center">
                                                <div className="w-2/4 flex-none">
                                                    <div className="text-lg font-medium truncate">Target Sales</div>
                                                    <div className="text-slate-500 mt-1">300 Sales</div>
                                                </div>
                                                <div className="flex-none ml-auto relative">
                                                    <canvas id="report-donut-chart-1" width="90" height="90"></canvas>
                                                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">20%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                                        <div className="box p-5 zoom-in">
                                            <div className="flex">
                                                <div className="text-lg font-medium truncate mr-3">Social Media</div>
                                                <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">320 Followers</div>
                                            </div>
                                            <div className="mt-4">
                                                <canvas className="simple-line-chart-1 -ml-1" height="60"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                                        <div className="box p-5 zoom-in">
                                            <div className="flex items-center">
                                                <div className="w-2/4 flex-none">
                                                    <div className="text-lg font-medium truncate">New Products</div>
                                                    <div className="text-slate-500 mt-1">1450 Products</div>
                                                </div>
                                                <div className="flex-none ml-auto relative">
                                                    <canvas id="report-donut-chart-2" width="90" height="90"></canvas>
                                                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">45%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                                        <div className="box p-5 zoom-in">
                                            <div className="flex">
                                                <div className="text-lg font-medium truncate mr-3">Posted Ads</div>
                                                <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">180 Campaign</div>
                                            </div>
                                            <div className="mt-4">
                                                <canvas className="simple-line-chart-1 -ml-1" height="60"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 mt-6">
                                    <div className="intro-y block sm:flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Weekly Top Products
                                        </h2>
                                        <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                                            <button className="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-feather="file-text" className="hidden sm:block w-4 h-4 mr-2"></i> Export to Excel </button>
                                            <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-feather="file-text" className="hidden sm:block w-4 h-4 mr-2"></i> Export to PDF </button>
                                        </div>
                                    </div>
                                    <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                                        <table className="table table-report sm:mt-2">
                                            <thead>
                                                <tr>
                                                    <th className="whitespace-nowrap">IMAGES</th>
                                                    <th className="whitespace-nowrap">PRODUCT NAME</th>
                                                    <th className="text-center whitespace-nowrap">STOCK</th>
                                                    <th className="text-center whitespace-nowrap">STATUS</th>
                                                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="intro-x">
                                                    <td className="w-40">
                                                        <div className="flex">
                                                            <div className="w-10 h-10 image-fit zoom-in">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" title="Uploaded at 1 November 2021"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-1.jpg" title="Uploaded at 23 August 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-9.jpg" title="Uploaded at 15 March 2022"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="" className="font-medium whitespace-nowrap">Oppo Find X2 Pro</a> 
                                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Smartphone &amp; Tablet</div>
                                                    </td>
                                                    <td className="text-center">114</td>
                                                    <td className="w-40">
                                                        <div className="flex items-center justify-center text-danger"> <i data-feather="check-square" className="w-4 h-4 mr-2"></i> Inactive </div>
                                                    </td>
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Edit </a>
                                                            <a className="flex items-center text-danger" href=""> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Delete </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="intro-x">
                                                    <td className="w-40">
                                                        <div className="flex">
                                                            <div className="w-10 h-10 image-fit zoom-in">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-1.jpg" title="Uploaded at 21 August 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-11.jpg" title="Uploaded at 21 January 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-4.jpg" title="Uploaded at 11 July 2020"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="" className="font-medium whitespace-nowrap">Apple MacBook Pro 13</a> 
                                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">PC &amp; Laptop</div>
                                                    </td>
                                                    <td className="text-center">50</td>
                                                    <td className="w-40">
                                                        <div className="flex items-center justify-center text-success"> <i data-feather="check-square" className="w-4 h-4 mr-2"></i> Active </div>
                                                    </td>
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Edit </a>
                                                            <a className="flex items-center text-danger" href=""> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Delete </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="intro-x">
                                                    <td className="w-40">
                                                        <div className="flex">
                                                            <div className="w-10 h-10 image-fit zoom-in">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-7.jpg" title="Uploaded at 29 April 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" title="Uploaded at 29 March 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-5.jpg" title="Uploaded at 6 August 2022"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="" className="font-medium whitespace-nowrap">Sony Master Series A9G</a> 
                                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Electronic</div>
                                                    </td>
                                                    <td className="text-center">140</td>
                                                    <td className="w-40">
                                                        <div className="flex items-center justify-center text-success"> <i data-feather="check-square" className="w-4 h-4 mr-2"></i> Active </div>
                                                    </td>
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Edit </a>
                                                            <a className="flex items-center text-danger" href=""> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Delete </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="intro-x">
                                                    <td className="w-40">
                                                        <div className="flex">
                                                            <div className="w-10 h-10 image-fit zoom-in">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-5.jpg" title="Uploaded at 8 January 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-4.jpg" title="Uploaded at 28 March 2022"/>
                                                            </div>
                                                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-8.jpg" title="Uploaded at 17 May 2020"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="" className="font-medium whitespace-nowrap">Oppo Find X2 Pro</a> 
                                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Smartphone &amp; Tablet</div>
                                                    </td>
                                                    <td className="text-center">109</td>
                                                    <td className="w-40">
                                                        <div className="flex items-center justify-center text-danger"> <i data-feather="check-square" className="w-4 h-4 mr-2"></i> Inactive </div>
                                                    </td>
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Edit </a>
                                                            <a className="flex items-center text-danger" href=""> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Delete </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                                        <nav className="w-full sm:w-auto sm:mr-auto">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link" href="#"> <i className="w-4 h-4" data-feather="chevrons-left"></i> </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#"> <i className="w-4 h-4" data-feather="chevron-left"></i> </a>
                                                </li>
                                                <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                                                <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                                                <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                                                <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                                                <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#"> <i className="w-4 h-4" data-feather="chevron-right"></i> </a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#"> <i className="w-4 h-4" data-feather="chevrons-right"></i> </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <select className="w-20 form-select box mt-3 sm:mt-0">
                                            <option>10</option>
                                            <option>25</option>
                                            <option>35</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-span-12 2xl:col-span-3">
                            <div className="2xl:border-l -mb-10 pb-10">
                                <div className="2xl:pl-6 grid grid-cols-12 gap-6">
                                    
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
                                        <div className="intro-x flex items-center h-10">
                                            <h2 className="text-lg font-medium truncate mr-5">
                                                Transactions
                                            </h2>
                                        </div>
                                        <div className="mt-5">
                                            <div className="intro-x">
                                                <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-3.jpg"/>
                                                    </div>
                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">John Travolta</div>
                                                        <div className="text-slate-500 text-xs mt-0.5">1 November 2021</div>
                                                    </div>
                                                    <div className="text-danger">-$24</div>
                                                </div>
                                            </div>
                                            <div className="intro-x">
                                                <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-8.jpg"/>
                                                    </div>
                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">Morgan Freeman</div>
                                                        <div className="text-slate-500 text-xs mt-0.5">21 August 2022</div>
                                                    </div>
                                                    <div className="text-success">+$195</div>
                                                </div>
                                            </div>
                                            <div className="intro-x">
                                                <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-12.jpg"/>
                                                    </div>
                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">Angelina Jolie</div>
                                                        <div className="text-slate-500 text-xs mt-0.5">29 April 2022</div>
                                                    </div>
                                                    <div className="text-success">+$31</div>
                                                </div>
                                            </div>
                                            <div className="intro-x">
                                                <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-5.jpg"/>
                                                    </div>
                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">John Travolta</div>
                                                        <div className="text-slate-500 text-xs mt-0.5">8 January 2022</div>
                                                    </div>
                                                    <div className="text-danger">-$38</div>
                                                </div>
                                            </div>
                                            <div className="intro-x">
                                                <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-3.jpg"/>
                                                    </div>
                                                    <div className="ml-4 mr-auto">
                                                        <div className="font-medium">Arnold Schwarzenegger</div>
                                                        <div className="text-slate-500 text-xs mt-0.5">13 June 2021</div>
                                                    </div>
                                                    <div className="text-success">+$50</div>
                                                </div>
                                            </div>
                                            <a href="" className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500">View More</a> 
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                                        <div className="intro-x flex items-center h-10">
                                            <h2 className="text-lg font-medium truncate mr-5">
                                                Recent Activities
                                            </h2>
                                            <a href="" className="ml-auto text-primary truncate">Show More</a> 
                                        </div>
                                        <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                                            <div className="intro-x relative flex items-center mb-3">
                                                <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-15.jpg"/>
                                                    </div>
                                                </div>
                                                <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Brad Pitt</div>
                                                        <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                    </div>
                                                    <div className="text-slate-500 mt-1">Has joined the team</div>
                                                </div>
                                            </div>
                                            <div className="intro-x relative flex items-center mb-3">
                                                <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-12.jpg"/>
                                                    </div>
                                                </div>
                                                <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Brad Pitt</div>
                                                        <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                    </div>
                                                    <div className="text-slate-500">
                                                        <div className="mt-1">Added 3 new photos</div>
                                                        <div className="flex mt-2">
                                                            <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Oppo Find X2 Pro">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-8.jpg"/>
                                                            </div>
                                                            <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Apple MacBook Pro 13">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-15.jpg"/>
                                                            </div>
                                                            <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                                                                <img alt="Icewall Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-6.jpg"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="intro-x text-slate-500 text-xs text-center my-4">12 November</div>
                                            <div className="intro-x relative flex items-center mb-3">
                                                <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-4.jpg"/>
                                                    </div>
                                                </div>
                                                <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Al Pacino</div>
                                                        <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                    </div>
                                                    <div className="text-slate-500 mt-1">Has changed <a className="text-primary" href="">Sony A7 III</a> price and description</div>
                                                </div>
                                            </div>
                                            <div className="intro-x relative flex items-center mb-3">
                                                <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-11.jpg"/>
                                                    </div>
                                                </div>
                                                <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Christian Bale</div>
                                                        <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                    </div>
                                                    <div className="text-slate-500 mt-1">Has changed <a className="text-primary" href="">Apple MacBook Pro 13</a> description</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3">
                                        <div className="intro-x flex items-center h-10">
                                            <h2 className="text-lg font-medium truncate mr-auto">
                                                Important Notes
                                            </h2>
                                            <button data-carousel="important-notes" data-target="prev" className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"> <i data-feather="chevron-left" className="w-4 h-4"></i> </button>
                                            <button data-carousel="important-notes" data-target="next" className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"> <i data-feather="chevron-right" className="w-4 h-4"></i> </button>
                                        </div>
                                        <div className="mt-5 intro-x">
                                            <div className="box zoom-in">
                                                <div className="tiny-slider" id="important-notes">
                                                    <div className="p-5">
                                                        <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                                        <div className="text-slate-500 text-justify mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</div>
                                                        <div className="font-medium flex mt-5">
                                                            <button type="button" className="btn btn-secondary py-1 px-2">View Notes</button>
                                                            <button type="button" className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                                        <div className="text-slate-500 text-justify mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</div>
                                                        <div className="font-medium flex mt-5">
                                                            <button type="button" className="btn btn-secondary py-1 px-2">View Notes</button>
                                                            <button type="button" className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                                        <div className="text-slate-500 text-justify mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</div>
                                                        <div className="font-medium flex mt-5">
                                                            <button type="button" className="btn btn-secondary py-1 px-2">View Notes</button>
                                                            <button type="button" className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
                                        <div className="intro-x flex items-center h-10">
                                            <h2 className="text-lg font-medium truncate mr-5">
                                                Schedules
                                            </h2>
                                            <a href="" className="ml-auto text-primary truncate flex items-center"> <i data-feather="plus" className="w-4 h-4 mr-1"></i> Add New Schedules </a>
                                        </div>
                                        <div className="mt-5">
                                            <div className="intro-x box">
                                                <div className="p-5">
                                                    <div className="flex">
                                                        <i data-feather="chevron-left" className="w-5 h-5 text-slate-500"></i> 
                                                        <div className="font-medium text-base mx-auto">April</div>
                                                        <i data-feather="chevron-right" className="w-5 h-5 text-slate-500"></i> 
                                                    </div>
                                                    <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                                                        <div className="font-medium">Su</div>
                                                        <div className="font-medium">Mo</div>
                                                        <div className="font-medium">Tu</div>
                                                        <div className="font-medium">We</div>
                                                        <div className="font-medium">Th</div>
                                                        <div className="font-medium">Fr</div>
                                                        <div className="font-medium">Sa</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">29</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">30</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">31</div>
                                                        <div className="py-0.5 rounded relative">1</div>
                                                        <div className="py-0.5 rounded relative">2</div>
                                                        <div className="py-0.5 rounded relative">3</div>
                                                        <div className="py-0.5 rounded relative">4</div>
                                                        <div className="py-0.5 rounded relative">5</div>
                                                        <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">6</div>
                                                        <div className="py-0.5 rounded relative">7</div>
                                                        <div className="py-0.5 bg-primary text-white rounded relative">8</div>
                                                        <div className="py-0.5 rounded relative">9</div>
                                                        <div className="py-0.5 rounded relative">10</div>
                                                        <div className="py-0.5 rounded relative">11</div>
                                                        <div className="py-0.5 rounded relative">12</div>
                                                        <div className="py-0.5 rounded relative">13</div>
                                                        <div className="py-0.5 rounded relative">14</div>
                                                        <div className="py-0.5 rounded relative">15</div>
                                                        <div className="py-0.5 rounded relative">16</div>
                                                        <div className="py-0.5 rounded relative">17</div>
                                                        <div className="py-0.5 rounded relative">18</div>
                                                        <div className="py-0.5 rounded relative">19</div>
                                                        <div className="py-0.5 rounded relative">20</div>
                                                        <div className="py-0.5 rounded relative">21</div>
                                                        <div className="py-0.5 rounded relative">22</div>
                                                        <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">23</div>
                                                        <div className="py-0.5 rounded relative">24</div>
                                                        <div className="py-0.5 rounded relative">25</div>
                                                        <div className="py-0.5 rounded relative">26</div>
                                                        <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">27</div>
                                                        <div className="py-0.5 rounded relative">28</div>
                                                        <div className="py-0.5 rounded relative">29</div>
                                                        <div className="py-0.5 rounded relative">30</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">1</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">2</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">3</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">4</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">5</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">6</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">7</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">8</div>
                                                        <div className="py-0.5 rounded relative text-slate-500">9</div>
                                                    </div>
                                                </div>
                                                <div className="border-t border-slate-200/60 p-5">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                                        <span className="truncate">UI/UX Workshop</span> <span className="font-medium xl:ml-auto">23th</span> 
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                        <span className="truncate">VueJs Frontend Development</span> <span className="font-medium xl:ml-auto">10th</span> 
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                                        <span className="truncate">Laravel Rest API</span> <span className="font-medium xl:ml-auto">31th</span> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div data-url="side-menu-dark-dashboard-overview-2.html" className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
            <div className="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div>
            <div className="dark-mode-switcher__toggle border"></div>
        </div>
    </div>
  );
}

export default Index;
