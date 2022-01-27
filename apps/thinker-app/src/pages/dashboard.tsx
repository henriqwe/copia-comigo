
export function Index() {
  
  return (
    <div className="py-5 md:py-0 bg-black/[0.15] dark:bg-transparent">
        
        <div className="mobile-menu md:hidden">
            <div className="mobile-menu-bar">
                <a href="" className="flex mr-auto">
                    <img alt="Rubick Tailwind HTML Admin Template" className="w-6" src="dist/images/logo.svg"/>
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
        
        <div className="flex overflow-hidden">
            
            <nav className="side-nav">
                <a href="" className="intro-x flex items-center pl-5 pt-4 mt-3">
                    <img alt="Tinker Tailwind HTML Admin Template" className="w-6" src="dist/images/logo.svg"/>
                    <span className="hidden xl:block text-white text-lg ml-3"> Tinker </span> 
                </a>
                <div className="side-nav__devider my-6"></div>
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
                
                <div className="top-bar -mx-4 px-4 md:mx-0 md:px-0">
                    
                    <nav aria-label="breadcrumb" className="-intro-x mr-auto hidden sm:flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Application</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                    
                    
                    <div className="intro-x relative mr-3 sm:mr-6">
                        <div className="search hidden sm:block">
                            <input type="text" className="search__input form-control border-transparent" placeholder="Search..."/>
                            <i data-feather="search" className="search__icon dark:text-slate-500"></i> 
                        </div>
                        <a className="notification sm:hidden" href=""> <i data-feather="search" className="notification__icon dark:text-slate-500"></i> </a>
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
                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-12.jpg"/>
                                        </div>
                                        <div className="ml-3">Keanu Reeves</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">keanureeves@left4code.com</div>
                                    </a>
                                    <a href="" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-7.jpg"/>
                                        </div>
                                        <div className="ml-3">Angelina Jolie</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">angelinajolie@left4code.com</div>
                                    </a>
                                    <a href="" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-9.jpg"/>
                                        </div>
                                        <div className="ml-3">Christian Bale</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">christianbale@left4code.com</div>
                                    </a>
                                    <a href="" className="flex items-center mt-2">
                                        <div className="w-8 h-8 image-fit">
                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-1.jpg"/>
                                        </div>
                                        <div className="ml-3">Al Pacino</div>
                                        <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">alpacino@left4code.com</div>
                                    </a>
                                </div>
                                <div className="search-result__content__title">Products</div>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-5.jpg"/>
                                    </div>
                                    <div className="ml-3">Dell XPS 13</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-6.jpg"/>
                                    </div>
                                    <div className="ml-3">Nikon Z6</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-2.jpg"/>
                                    </div>
                                    <div className="ml-3">Samsung Q90 QLED TV</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Electronic</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/preview-12.jpg"/>
                                    </div>
                                    <div className="ml-3">Samsung Galaxy S20 Ultra</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Smartphone &amp; Tablet</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="intro-x dropdown mr-auto sm:mr-6">
                        <div className="dropdown-toggle notification notification--bullet cursor-pointer" role="button" aria-expanded="false" data-tw-toggle="dropdown"> <i data-feather="bell" className="notification__icon dark:text-slate-500"></i> </div>
                        <div className="notification-content pt-2 dropdown-menu">
                            <div className="notification-content__box dropdown-content">
                                <div className="notification-content__title">Notifications</div>
                                <div className="cursor-pointer relative flex items-center ">
                                    <div className="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-12.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <a href="javascript:;" className="font-medium truncate mr-5">Keanu Reeves</a> 
                                            <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                        </div>
                                        <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                    </div>
                                </div>
                                <div className="cursor-pointer relative flex items-center mt-5">
                                    <div className="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-7.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <a href="javascript:;" className="font-medium truncate mr-5">Angelina Jolie</a> 
                                            <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                        </div>
                                        <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                    </div>
                                </div>
                                <div className="cursor-pointer relative flex items-center mt-5">
                                    <div className="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-9.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <a href="javascript:;" className="font-medium truncate mr-5">Christian Bale</a> 
                                            <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                        </div>
                                        <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer relative flex items-center mt-5">
                                    <div className="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-1.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <a href="javascript:;" className="font-medium truncate mr-5">Al Pacino</a> 
                                            <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                        </div>
                                        <div className="w-full truncate text-slate-500 mt-0.5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 20</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer relative flex items-center mt-5">
                                    <div className="w-12 h-12 flex-none image-fit mr-1">
                                        <img alt="Tinker Tailwind HTML Admin Template" className="rounded-full" src="dist/images/profile-9.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <a href="javascript:;" className="font-medium truncate mr-5">Kate Winslet</a> 
                                            <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">03:20 PM</div>
                                        </div>
                                        <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="intro-x dropdown w-8 h-8">
                        <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" role="button" aria-expanded="false" data-tw-toggle="dropdown">
                            <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-14.jpg"/>
                        </div>
                        <div className="dropdown-menu w-56">
                            <ul className="dropdown-content bg-primary text-white">
                                <li className="p-2">
                                    <div className="font-medium">Keanu Reeves</div>
                                    <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">Software Engineer</div>
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
                
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 2xl:col-span-9">
                        <div className="grid grid-cols-12 gap-6">
                            
                            <div className="col-span-12 mt-6 -mb-6 intro-y">
                                <div className="alert alert-dismissible show box bg-primary text-white flex items-center mb-6" role="alert">
                                    <span>Introducing new dashboard! Download now at <a href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820" className="underline ml-1" target="blank">themeforest.net</a>.</span>
                                    <button type="button" className="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"> <i data-feather="x" className="w-4 h-4"></i> </button>
                                </div>
                            </div>
                            
                            
                            <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
                                <div className="intro-y block sm:flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        General Report
                                    </h2>
                                    <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="custom-date">Custom Date</option>
                                    </select>
                                </div>
                                <div className="report-box-2 intro-y mt-12 sm:mt-5">
                                    <div className="box sm:flex">
                                        <div className="px-8 py-12 flex flex-col justify-center flex-1">
                                            <i data-feather="shopping-bag" className="w-10 h-10 text-warning"></i> 
                                            <div className="relative text-3xl font-medium mt-12 pl-4 ml-0.5"> <span className="absolute text-2xl font-medium top-0 left-0 -ml-0.5">$</span> 54.143 </div>
                                            <div className="report-box-2__indicator bg-success tooltip cursor-pointer" title="47% Higher than last month"> 47% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                            <div className="mt-4 text-slate-500">Sales earnings this month after associated author fees, & before taxes.</div>
                                            <button className="btn btn-outline-secondary relative justify-start rounded-full mt-12">
                                                Download Reports 
                                                <span className="w-8 h-8 absolute flex justify-center items-center bg-primary text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"> <i data-feather="arrow-right" className="w-4 h-4"></i> </span>
                                            </button>
                                        </div>
                                        <div className="px-8 py-12 flex flex-col justify-center flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                                            <div className="text-slate-500 text-xs">TOTAL TRANSACTION</div>
                                            <div className="mt-1.5 flex items-center">
                                                <div className="text-base">4.501</div>
                                                <div className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2" title="2% Lower than last month"> 2% <i data-feather="chevron-down" className="w-4 h-4 ml-0.5"></i> </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-5">CANCELATION CASE</div>
                                            <div className="mt-1.5 flex items-center">
                                                <div className="text-base">2</div>
                                                <div className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2" title="0.1% Lower than last month"> 0.1% <i data-feather="chevron-down" className="w-4 h-4 ml-0.5"></i> </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-5">GROSS RENTAL VALUE</div>
                                            <div className="mt-1.5 flex items-center">
                                                <div className="text-base">$72.000</div>
                                                <div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2" title="49% Higher than last month"> 49% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-5">GROSS RENTAL PROFIT</div>
                                            <div className="mt-1.5 flex items-center">
                                                <div className="text-base">$54.000</div>
                                                <div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2" title="52% Higher than last month"> 52% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-5">NEW USERS</div>
                                            <div className="mt-1.5 flex items-center">
                                                <div className="text-base">2.500</div>
                                                <div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2" title="52% Higher than last month"> 52% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2">
                                <div className="intro-y flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        Visitors
                                    </h2>
                                    <a href="" className="ml-auto text-primary truncate">View on Map</a> 
                                </div>
                                <div className="report-box-2 intro-y mt-5">
                                    <div className="box p-5">
                                        <div className="flex items-center">
                                            Realtime active users 
                                            <div className="dropdown ml-auto">
                                                <a className="dropdown-toggle w-5 h-5 block -mr-2" href="javascript:;" aria-expanded="false" data-tw-toggle="dropdown"> <i data-feather="more-vertical" className="w-5 h-5 text-slate-500"></i> </a>
                                                <div className="dropdown-menu w-40">
                                                    <ul className="dropdown-content">
                                                        <li>
                                                            <a href="" className="dropdown-item"> <i data-feather="file-text" className="w-4 h-4 mr-2"></i> Export </a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="dropdown-item"> <i data-feather="settings" className="w-4 h-4 mr-2"></i> Settings </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-medium mt-2">214</div>
                                        <div className="border-b border-slate-200 flex pb-2 mt-4">
                                            <div className="text-slate-500 text-xs">Page views per second</div>
                                            <div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-auto" title="49% Lower than last month"> 49% <i data-feather="chevron-up" className="w-4 h-4 ml-0.5"></i> </div>
                                        </div>
                                        <div className="mt-2 border-b broder-slate-200">
                                            <div className="-mb-1.5 -ml-2.5">
                                                <canvas id="report-bar-chart" height="111"></canvas>
                                            </div>
                                        </div>
                                        <div className="text-slate-500 text-xs border-b border-slate-200 flex mb-2 pb-2 mt-4">
                                            <div>Top Active Pages</div>
                                            <div className="ml-auto">Active Users</div>
                                        </div>
                                        <div className="flex">
                                            <div>/letz-lara…review/2653</div>
                                            <div className="ml-auto">472</div>
                                        </div>
                                        <div className="flex mt-1.5">
                                            <div>/tinker…review/1674</div>
                                            <div className="ml-auto">294</div>
                                        </div>
                                        <div className="flex mt-1.5">
                                            <div>/profile…review/46789</div>
                                            <div className="ml-auto">83</div>
                                        </div>
                                        <div className="flex mt-1.5">
                                            <div>/profile…review/24357</div>
                                            <div className="ml-auto">21</div>
                                        </div>
                                        <button className="btn btn-outline-secondary border-dashed w-full py-1 px-2 mt-4">Real-Time Report</button>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2 lg:mt-6 xl:mt-2">
                                <div className="intro-y flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        Users By Age
                                    </h2>
                                    <a href="" className="ml-auto text-primary truncate">Show More</a> 
                                </div>
                                <div className="report-box-2 intro-y mt-5">
                                    <div className="box p-5">
                                        <ul className=" nav nav-pills w-4/5 bg-slate-100 dark:bg-black/20 rounded-md mx-auto " role="tablist" >
                                            <li id="active-users-tab" className="nav-item flex-1" role="presentation">
                                                <button className="nav-link w-full py-1.5 px-2 active" data-tw-toggle="pill" data-tw-target="#active-users" type="button" role="tab" aria-controls="active-users" aria-selected="true" > Active </button>
                                            </li>
                                            <li id="inactive-users-tab" className="nav-item flex-1" role="presentation">
                                                <button className="nav-link w-full py-1.5 px-2" data-tw-toggle="pill" data-tw-target="#inactive-users" type="button" role="tab" aria-controls="inactive-users" aria-selected="false" > Inactive </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content mt-6">
                                            <div className="tab-pane active" id="active-users" role="tabpanel" aria-labelledby="active-users-tab">
                                                <div className="relative">
                                                    <canvas className="mt-3" id="report-donut-chart" height="300"></canvas>
                                                    <div className="flex flex-col justify-center items-center absolute w-full h-full top-0 left-0">
                                                        <div className="text-2xl font-medium">2.501</div>
                                                        <div className="text-slate-500 mt-0.5">Active Users</div>
                                                    </div>
                                                </div>
                                                <div className="mt-5">
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
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="col-span-12 lg:col-span-8 mt-6">
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
                                                <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-2.jpg"/>
                                            </div>
                                            <div className="ml-4 mr-auto">
                                                <div className="font-medium">Russell Crowe</div>
                                                <div className="text-slate-500 text-xs mt-0.5">17 July 2022</div>
                                            </div>
                                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                        </div>
                                    </div>
                                    <div className="intro-y">
                                        <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-5.jpg"/>
                                            </div>
                                            <div className="ml-4 mr-auto">
                                                <div className="font-medium">Leonardo DiCaprio</div>
                                                <div className="text-slate-500 text-xs mt-0.5">5 September 2021</div>
                                            </div>
                                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                        </div>
                                    </div>
                                    <div className="intro-y">
                                        <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-2.jpg"/>
                                            </div>
                                            <div className="ml-4 mr-auto">
                                                <div className="font-medium">Denzel Washington</div>
                                                <div className="text-slate-500 text-xs mt-0.5">26 May 2021</div>
                                            </div>
                                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                        </div>
                                    </div>
                                    <div className="intro-y">
                                        <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                                <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-14.jpg"/>
                                            </div>
                                            <div className="ml-4 mr-auto">
                                                <div className="font-medium">Christian Bale</div>
                                                <div className="text-slate-500 text-xs mt-0.5">5 September 2021</div>
                                            </div>
                                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">137 Sales</div>
                                        </div>
                                    </div>
                                    <a href="" className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500">View More</a> 
                                </div>
                            </div>
                            
                            
                            <div className="col-span-12 lg:col-span-6 mt-6">
                                <div className="box p-8 relative overflow-hidden bg-primary intro-y">
                                    <div className="leading-[2.15rem] w-full sm:w-72 text-white text-xl -mt-3">Transact safely with Lender’s Fund Account (RDL)</div>
                                    <div className="w-full sm:w-72 leading-relaxed text-white/70 dark:text-slate-500 mt-3">Apply now, quick registration.</div>
                                    <button className="btn w-32 bg-white dark:bg-darkmode-800 dark:text-white mt-6 sm:mt-10">Start Now</button>
                                    <img className="hidden sm:block absolute top-0 right-0 w-2/5 -mt-3 mr-2" alt="Tinker Tailwind HTML Admin Template" src="dist/images/woman-illustration.svg"/>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-6 mt-6">
                                <div className="box p-8 relative overflow-hidden intro-y">
                                    <div className="leading-[2.15rem] w-full sm:w-52 text-primary dark:text-white text-xl -mt-3">Invite friends to get <span className="font-medium">FREE</span> bonuses!</div>
                                    <div className="w-full sm:w-60 leading-relaxed text-slate-500 mt-2">Get a IDR 100,000 voucher by inviting your friends to fund #BecomeMember</div>
                                    <div className="w-48 relative mt-6 cursor-pointer tooltip" title="Copy referral link">
                                        <input type="text" className="form-control" value="https://dashboard.in"/>
                                        <i data-feather="copy" className="absolute right-0 top-0 bottom-0 my-auto mr-4 w-4 h-4"></i> 
                                    </div>
                                    <img className="hidden sm:block absolute top-0 right-0 w-1/2 mt-1 -mr-12" alt="Tinker Tailwind HTML Admin Template" src="dist/images/phone-illustration.svg"/>
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
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-12.jpg" title="Uploaded at 17 July 2022"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-12.jpg" title="Uploaded at 2 February 2021"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-9.jpg" title="Uploaded at 13 July 2021"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="" className="font-medium whitespace-nowrap">Dell XPS 13</a> 
                                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">PC &amp; Laptop</div>
                                                </td>
                                                <td className="text-center">133</td>
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
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" title="Uploaded at 5 September 2021"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-7.jpg" title="Uploaded at 3 July 2020"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-11.jpg" title="Uploaded at 7 January 2022"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="" className="font-medium whitespace-nowrap">Sony Master Series A9G</a> 
                                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Electronic</div>
                                                </td>
                                                <td className="text-center">62</td>
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
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-4.jpg" title="Uploaded at 26 May 2021"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" title="Uploaded at 2 May 2022"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-15.jpg" title="Uploaded at 2 February 2021"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="" className="font-medium whitespace-nowrap">Dell XPS 13</a> 
                                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">PC &amp; Laptop</div>
                                                </td>
                                                <td className="text-center">50</td>
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
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-13.jpg" title="Uploaded at 5 September 2021"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-13.jpg" title="Uploaded at 19 October 2022"/>
                                                        </div>
                                                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-14.jpg" title="Uploaded at 18 September 2022"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="" className="font-medium whitespace-nowrap">Oppo Find X2 Pro</a> 
                                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Smartphone &amp; Tablet</div>
                                                </td>
                                                <td className="text-center">50</td>
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
                                
                                <div className="col-span-12 md:col-span-6 xl:col-span-12 mt-3 2xl:mt-8">
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
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-4.jpg"/>
                                                </div>
                                            </div>
                                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Denzel Washington</div>
                                                    <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                </div>
                                                <div className="text-slate-500 mt-1">Has joined the team</div>
                                            </div>
                                        </div>
                                        <div className="intro-x relative flex items-center mb-3">
                                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-5.jpg"/>
                                                </div>
                                            </div>
                                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Al Pacino</div>
                                                    <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                </div>
                                                <div className="text-slate-500">
                                                    <div className="mt-1">Added 3 new photos</div>
                                                    <div className="flex mt-2">
                                                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Dell XPS 13">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-14.jpg"/>
                                                        </div>
                                                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-9.jpg"/>
                                                        </div>
                                                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Dell XPS 13">
                                                            <img alt="Tinker Tailwind HTML Admin Template" className="rounded-md border border-white" src="dist/images/preview-5.jpg"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="intro-x text-slate-500 text-xs text-center my-4">12 November</div>
                                        <div className="intro-x relative flex items-center mb-3">
                                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-1.jpg"/>
                                                </div>
                                            </div>
                                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Al Pacino</div>
                                                    <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                </div>
                                                <div className="text-slate-500 mt-1">Has changed <a className="text-primary" href="">Samsung Galaxy S20 Ultra</a> price and description</div>
                                            </div>
                                        </div>
                                        <div className="intro-x relative flex items-center mb-3">
                                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-2.jpg"/>
                                                </div>
                                            </div>
                                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Russell Crowe</div>
                                                    <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                                </div>
                                                <div className="text-slate-500 mt-1">Has changed <a className="text-primary" href="">Sony A7 III</a> description</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                                    <div className="intro-x flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            Transactions
                                        </h2>
                                    </div>
                                    <div className="mt-5">
                                        <div className="intro-x">
                                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-2.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Russell Crowe</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">17 July 2022</div>
                                                </div>
                                                <div className="text-success">+$118</div>
                                            </div>
                                        </div>
                                        <div className="intro-x">
                                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-5.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Leonardo DiCaprio</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">5 September 2021</div>
                                                </div>
                                                <div className="text-success">+$120</div>
                                            </div>
                                        </div>
                                        <div className="intro-x">
                                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-2.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Denzel Washington</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">26 May 2021</div>
                                                </div>
                                                <div className="text-danger">-$118</div>
                                            </div>
                                        </div>
                                        <div className="intro-x">
                                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-14.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">Christian Bale</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">5 September 2021</div>
                                                </div>
                                                <div className="text-danger">-$163</div>
                                            </div>
                                        </div>
                                        <div className="intro-x">
                                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                    <img alt="Tinker Tailwind HTML Admin Template" src="dist/images/profile-12.jpg"/>
                                                </div>
                                                <div className="ml-4 mr-auto">
                                                    <div className="font-medium">John Travolta</div>
                                                    <div className="text-slate-500 text-xs mt-0.5">22 February 2021</div>
                                                </div>
                                                <div className="text-danger">-$161</div>
                                            </div>
                                        </div>
                                        <a href="" className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500">View More</a> 
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
        
        <div data-url="side-menu-dark-dashboard-overview-2.html" className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
            <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
            <div className="dark-mode-switcher__toggle border"></div>
        </div>
            
        
    </div>
  );
}

export default Index;
