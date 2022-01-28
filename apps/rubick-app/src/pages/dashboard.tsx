import styles from './dashboard.module.css';

export function Index() {
  return (
      <div className="flex">
        <nav className={styles['side-nav']}>
          <a href="" className="flex items-center pt-4 pl-5 intro-x">
            <img alt="Rubick Tailwind HTML Admin Template" className="w-6" src="/dist/images/logo.svg" />
              <span className="hidden ml-3 text-lg text-white xl:block"> Ru<span
                className="font-medium">bick</span> </span>
          </a>
          <div className={ 'my-6 ' + styles['side-nav__devider']}/>
          <ul>
            <li>
              <a href="/teste" className={styles['side-menu'] + ' ' + styles['side-active']}>
                <div className={styles['side-menu__icon']}><i data-feather="home"/></div>
                <div className={styles['side-menu__title']}>
                  Dashboard
                  <div className={`transform rotate-180 ${styles['side-menu__sub-icon']}`}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className={styles['side-menu__sub-open']}>
                <li>
                  <a href="index.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 1</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-dashboard-overview-2.html" className={styles['side-menu'] + ' ' + styles['side-active']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 2</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-dashboard-overview-3.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 3</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="box"/></div>
                <div className={styles['side-menu__title']}>
                  Menu Layout
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="index.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Side Menu</div>
                  </a>
                </li>
                <li>
                  <a href="simple-menu-light-dashboard-overview-1.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Simple Menu</div>
                  </a>
                </li>
                <li>
                  <a href="top-menu-light-dashboard-overview-1.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Top Menu</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="side-menu-light-inbox.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="inbox"/></div>
                <div className={styles['side-menu__title']}> Inbox</div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-file-manager.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="hard-drive"/></div>
                <div className={styles['side-menu__title']}> File Manager</div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-point-of-sale.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="credit-card"/></div>
                <div className={styles['side-menu__title']}> Point of Sale</div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-chat.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="message-square"/></div>
                <div className={styles['side-menu__title']}> Chat</div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-post.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="file-text"/></div>
                <div className={styles['side-menu__title']}> Post</div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-calendar.html" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="calendar"/></div>
                <div className={styles['side-menu__title']}> Calendar</div>
              </a>
            </li>
            <li className="my-6 side-nav__devider"/>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="edit"/></div>
                <div className={styles['side-menu__title']}>
                  Crud
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-crud-data-list.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Data List</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-crud-form.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Form</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="users"/></div>
                <div className={styles['side-menu__title']}>
                  Users
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-users-layout-1.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Layout 1</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-users-layout-2.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Layout 2</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-users-layout-3.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Layout 3</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="trello"/></div>
                <div className={styles['side-menu__title']}>
                  Profile
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-profile-overview-1.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 1</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-profile-overview-2.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 2</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-profile-overview-3.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Overview 3</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="layout"/></div>
                <div className={styles['side-menu__title']}>
                  Pages
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Wizards
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-wizard-layout-1.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-wizard-layout-2.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-wizard-layout-3.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Blog
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-blog-layout-1.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-blog-layout-2.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-blog-layout-3.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Pricing
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-pricing-layout-1.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-pricing-layout-2.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Invoice
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-invoice-layout-1.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-invoice-layout-2.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      FAQ
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-faq-layout-1.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-faq-layout-2.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-faq-layout-3.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="login-light-login.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Login</div>
                  </a>
                </li>
                <li>
                  <a href="login-light-register.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Register</div>
                  </a>
                </li>
                <li>
                  <a href="main-light-error-page.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Error Page</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-update-profile.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Update profile</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-change-password.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Change Password</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="my-6 side-nav__devider"/>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="inbox"/></div>
                <div className={styles['side-menu__title']}>
                  Components
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Table
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-regular-table.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Regular Table</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-tabulator.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Tabulator</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}>
                      Overlay
                      <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-modal.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Modal</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-slide-over.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Slide Over</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-notification.html" className={styles['side-menu']}>
                        <div className={styles['side-menu__icon']}><i data-feather="zap"/></div>
                        <div className={styles['side-menu__title']}>Notification</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-accordion.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Accordion</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-button.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Button</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-alert.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Alert</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-progress-bar.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Progress Bar</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-tooltip.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Tooltip</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-dropdown.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Dropdown</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-typography.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Typography</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-icon.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Icon</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-loading-icon.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Loading Icon</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="sidebar"/></div>
                <div className={styles['side-menu__title']}>
                  Forms
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-regular-form.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Regular Form</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-datepicker.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Datepicker</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-tom-select.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Tom Select</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-file-upload.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> File Upload</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-wysiwyg-editor.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Wysiwyg Editor</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-validation.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Validation</div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className={styles['side-menu']}>
                <div className={styles['side-menu__icon']}><i data-feather="hard-drive"/></div>
                <div className={styles['side-menu__title']}>
                  Widgets
                  <div className={styles['side-menu__sub-icon']}><i data-feather="chevron-down"/></div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-chart.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Chart</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-slider.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Slider</div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-image-zoom.html" className={styles['side-menu']}>
                    <div className={styles['side-menu__icon']}><i data-feather="activity"/></div>
                    <div className={styles['side-menu__title']}> Image Zoom</div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="content">
          <div className="top-bar">


            <div className="hidden mr-auto -intro-x breadcrumb sm:flex"><a href="">Application</a> <i
  data-feather="chevron-right" className="breadcrumb__icon"/> <a href=""
                                                                                className="breadcrumb--active">Dashboard</a>
            </div>




            <div className="relative mr-3 intro-x sm:mr-6">
              <div className="hidden search sm:block">
                <input type="text" className="border-transparent search__input form-control placeholder-theme-13"
                       placeholder="Search..." />
                  <i data-feather="search" className="search__icon dark:text-gray-300"/>
              </div>
              <a className="notification sm:hidden" href=""> <i data-feather="search"
  className="notification__icon dark:text-gray-300"/>
              </a>
              <div className="search-result">
                <div className="search-result__content">
                  <div className="search-result__content__title">Pages</div>
                  <div className="mb-5">
                    <a href="" className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-18 text-theme-9"><i
  className="w-4 h-4" data-feather="inbox"/></div>
                      <div className="ml-3">Mail Settings</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-17 text-theme-11">
                        <i className="w-4 h-4" data-feather="users"/></div>
                      <div className="ml-3">Users & Permissions</div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-14 text-theme-10">
                        <i className="w-4 h-4" data-feather="credit-card"/></div>
                      <div className="ml-3">Transactions Report</div>
                    </a>
                  </div>
                  <div className="search-result__content__title">Users</div>
                  <div className="mb-5">
                    <a href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                             src="/dist/images/profile-10.jpg" />
                      </div>
                      <div className="ml-3">Al Pacino</div>
                      <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">alpacino@left4code.com
                      </div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                             src="/dist/images/profile-11.jpg"/>
                      </div>
                      <div className="ml-3">Russell Crowe</div>
                      <div
                        className="w-48 ml-auto text-xs text-right text-gray-600 truncate">russellcrowe@left4code.com
                      </div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                             src="/dist/images/profile-1.jpg"/>
                      </div>
                      <div className="ml-3">Angelina Jolie</div>
                      <div
                        className="w-48 ml-auto text-xs text-right text-gray-600 truncate">angelinajolie@left4code.com
                      </div>
                    </a>
                    <a href="" className="flex items-center mt-2">
                      <div className="w-8 h-8 image-fit">
                        <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                             src="/dist/images/profile-6.jpg"/>
                      </div>
                      <div className="ml-3">Al Pacino</div>
                      <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">alpacino@left4code.com
                      </div>
                    </a>
                  </div>
                  <div className="search-result__content__title">Products</div>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/preview-9.jpg"/>
                    </div>
                    <div className="ml-3">Sony A7 III</div>
                    <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">Photography</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/preview-12.jpg"/>
                    </div>
                    <div className="ml-3">Nikon Z6</div>
                    <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">Photography</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/preview-6.jpg"/>
                    </div>
                    <div className="ml-3">Apple MacBook Pro 13</div>
                    <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">PC &amp; Laptop</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/preview-5.jpg"/>
                    </div>
                    <div className="ml-3">Nike Air Max 270</div>
                    <div className="w-48 ml-auto text-xs text-right text-gray-600 truncate">Sport &amp; Outdoor</div>
                  </a>
                </div>
              </div>
            </div>




            <div className="mr-auto intro-x dropdown sm:mr-6">
              <div className="cursor-pointer dropdown-toggle notification notification--bullet" role="button"
                   aria-expanded="false"><i data-feather="bell" className="notification__icon dark:text-gray-300"/>
              </div>
              <div className="pt-2 notification-content dropdown-menu">
                <div className="notification-content__box dropdown-menu__content box dark:bg-dark-6">
                  <div className="notification-content__title">Notifications</div>
                  <div className="relative flex items-center cursor-pointer">
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/profile-10.jpg"/>
                        <div
  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-theme-9"/>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="javascript:;" className="mr-5 font-medium truncate">Al Pacino</a>
                        <div className="ml-auto text-xs text-gray-500 whitespace-nowrap">01:10 PM</div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text
                        ever since the 1500
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5 cursor-pointer">
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/profile-11.jpg"/>
                        <div
  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-theme-9"/>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="javascript:;" className="mr-5 font-medium truncate">Russell Crowe</a>
                        <div className="ml-auto text-xs text-gray-500 whitespace-nowrap">03:20 PM</div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">Contrary to popular belief, Lorem Ipsum is
                        not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making
                        it over 20
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5 cursor-pointer">
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/profile-1.jpg"/>
                        <div
  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-theme-9"/>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="javascript:;" className="mr-5 font-medium truncate">Angelina Jolie</a>
                        <div className="ml-auto text-xs text-gray-500 whitespace-nowrap">01:10 PM</div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">It is a long established fact that a reader
                        will be /distracted by the readable content of a page when looking at its layout. The point of
                        using Lorem
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5 cursor-pointer">
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/profile-6.jpg"/>
                        <div
  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-theme-9"/>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="javascript:;" className="mr-5 font-medium truncate">Al Pacino</a>
                        <div className="ml-auto text-xs text-gray-500 whitespace-nowrap">01:10 PM</div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text
                        ever since the 1500
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5 cursor-pointer">
                    <div className="flex-none w-12 h-12 mr-1 image-fit">
                      <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full"
                           src="/dist/images/profile-4.jpg"/>
                        <div
  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-theme-9"/>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="javascript:;" className="mr-5 font-medium truncate">Arnold Schwarzenegger</a>
                        <div className="ml-auto text-xs text-gray-500 whitespace-nowrap">01:10 PM</div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">Contrary to popular belief, Lorem Ipsum is
                        not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making
                        it over 20
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div className="w-8 h-8 intro-x dropdown">
              <div className="w-8 h-8 overflow-hidden rounded-full shadow-lg dropdown-toggle image-fit zoom-in"
                   role="button" aria-expanded="false">
                <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-4.jpg"/>
              </div>
              <div className="w-56 dropdown-menu">
                <div className="text-white dropdown-menu__content box bg-theme-26 dark:bg-dark-6">
                  <div className="p-4 border-b border-theme-27 dark:border-dark-3">
                    <div className="font-medium">Al Pacino</div>
                    <div className="text-xs text-theme-28 mt-0.5 dark:text-gray-600">Software Engineer</div>
                  </div>
                  <div className="p-2">
                    <a href=""
                       className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-theme-1 dark:hover:bg-dark-3">
                      <i data-feather="user" className="w-4 h-4 mr-2"/> Profile </a>
                    <a href=""
                       className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-theme-1 dark:hover:bg-dark-3">
                      <i data-feather="edit" className="w-4 h-4 mr-2"/> Add Account </a>
                    <a href=""
                       className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-theme-1 dark:hover:bg-dark-3">
                      <i data-feather="lock" className="w-4 h-4 mr-2"/> Reset Password </a>
                    <a href=""
                       className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-theme-1 dark:hover:bg-dark-3">
                      <i data-feather="help-circle" className="w-4 h-4 mr-2"/> Help </a>
                  </div>
                  <div className="p-2 border-t border-theme-27 dark:border-dark-3">
                    <a href=""
                       className="flex items-center block p-2 transition duration-300 ease-in-out rounded-md hover:bg-theme-1 dark:hover:bg-dark-3">
                      <i data-feather="toggle-right" className="w-4 h-4 mr-2"/> Logout </a>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-9">
              <div className="grid grid-cols-12 gap-6">


                <div className="col-span-12 mt-6 -mb-6 intro-y">
                  <div className="flex items-center mb-6 text-white alert alert-dismissible show box bg-theme-3"
                       role="alert">
                    <span>Introducing new dashboard! Download now at <a
                      href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                      className="ml-1 underline" target="blank">themeforest.net</a>.</span>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"><i
  data-feather="x" className="w-4 h-4"/></button>
                  </div>
                </div>




                <div className="col-span-12 mt-2 lg:col-span-8 xl:col-span-6">
                  <div className="items-center block h-10 intro-y sm:flex">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      General Report
                    </h2>
                    <select className="mt-3 sm:ml-auto sm:mt-0 sm:w-auto form-select box">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom-date">Custom Date</option>
                    </select>
                  </div>
                  <div className="mt-12 report-box-2 intro-y sm:mt-5">
                    <div className="box sm:flex">
                      <div className="flex flex-col justify-center flex-1 px-8 py-12">
                        <i data-feather="shopping-bag" className="w-10 h-10 text-theme-12"/>
                        <div className="relative text-3xl font-medium mt-12 pl-4 ml-0.5"><span
                          className="absolute text-2xl font-medium top-0 left-0 -ml-0.5">$</span> 54.143
                        </div>
                        <div className="cursor-pointer report-box-2__indicator bg-theme-9 tooltip"
                             title="47% Higher than last month"> 47% <i data-feather="chevron-up"
  className="w-4 h-4 ml-0.5"/></div>
                        <div className="mt-4 text-gray-600 dark:text-gray-600">Sales earnings this month after
                          associated author fees, & before taxes.
                        </div>
                        <button className="relative justify-start mt-12 rounded-full btn btn-outline-secondary">
                          Download Reports
                          <span
                            className="w-8 h-8 absolute flex justify-center items-center bg-theme-1 text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"> <i
  data-feather="arrow-right" className="w-4 h-4"/> </span>
                        </button>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 px-8 py-12 border-t border-gray-300 border-dashed sm:border-t-0 sm:border-l dark:border-dark-5">
                        <div className="text-xs text-gray-600 dark:text-gray-600">TOTAL TRANSACTION</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">4.501</div>
                          <div className="flex ml-2 text-xs font-medium cursor-pointer text-theme-6 tooltip"
                               title="2% Lower than last month"> 2% <i data-feather="chevron-down"
  className="w-4 h-4 ml-0.5"/></div>
                        </div>
                        <div className="mt-5 text-xs text-gray-600 dark:text-gray-600">CANCELATION CASE</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">2</div>
                          <div className="flex ml-2 text-xs font-medium cursor-pointer text-theme-6 tooltip"
                               title="0.1% Lower than last month"> 0.1% <i data-feather="chevron-down"
  className="w-4 h-4 ml-0.5"/></div>
                        </div>
                        <div className="mt-5 text-xs text-gray-600 dark:text-gray-600">GROSS RENTAL VALUE</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$72.000</div>
                          <div className="flex ml-2 text-xs font-medium cursor-pointer text-theme-9 tooltip"
                               title="49% Higher than last month"> 49% <i data-feather="chevron-up"
  className="w-4 h-4 ml-0.5"/></div>
                        </div>
                        <div className="mt-5 text-xs text-gray-600 dark:text-gray-600">GROSS RENTAL PROFIT</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$54.000</div>
                          <div className="flex ml-2 text-xs font-medium cursor-pointer text-theme-9 tooltip"
                               title="52% Higher than last month"> 52% <i data-feather="chevron-up"
  className="w-4 h-4 ml-0.5"/></div>
                        </div>
                        <div className="mt-5 text-xs text-gray-600 dark:text-gray-600">NEW USERS</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">2.500</div>
                          <div className="flex ml-2 text-xs font-medium cursor-pointer text-theme-9 tooltip"
                               title="52% Higher than last month"> 52% <i data-feather="chevron-up"
  className="w-4 h-4 ml-0.5"/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




                <div className="col-span-12 mt-2 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Visitors
                    </h2>
                    <a href="" className="ml-auto truncate text-theme-1 dark:text-theme-10">View on Map</a>
                  </div>
                  <div className="mt-5 report-box-2 intro-y">
                    <div className="p-5 box">
                      <div className="flex items-center">
                        Realtime active users
                        <div className="ml-auto dropdown">
                          <a className="block w-5 h-5 -mr-2 dropdown-toggle" href="javascript:;" aria-expanded="false">
                            <i data-feather="more-vertical" className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                          </a>
                          <div className="w-40 dropdown-menu">
                            <div className="p-2 dropdown-menu__content box dark:bg-dark-1">
                              <a href=""
                                 className="flex items-center block p-2 transition duration-300 ease-in-out bg-white rounded-md dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2">
                                <i data-feather="file-text" className="w-4 h-4 mr-2"/> Export </a>
                              <a href=""
                                 className="flex items-center block p-2 transition duration-300 ease-in-out bg-white rounded-md dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2">
                                <i data-feather="settings" className="w-4 h-4 mr-2"/> Settings </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-2xl font-medium">214</div>
                      <div className="flex pb-2 mt-4 border-b border-gray-200">
                        <div className="text-xs text-gray-600 dark:text-gray-600">Page views per second</div>
                        <div className="flex ml-auto text-xs font-medium cursor-pointer text-theme-9 tooltip"
                             title="49% Lower than last month"> 49% <i data-feather="chevron-up"
  className="w-4 h-4 ml-0.5"/></div>
                      </div>
                      <div className="mt-2 border-b broder-gray-200">
                        <div className="-mb-1.5 -ml-2.5">
                          <canvas id="report-bar-chart" height="111"/>
                        </div>
                      </div>
                      <div
                        className="flex pb-2 mt-4 mb-2 text-xs text-gray-600 border-b border-gray-200 dark:text-gray-600">
                        <div>Top Active Pages</div>
                        <div className="ml-auto">Active Users</div>
                      </div>
                      <div className="flex">
                        <div>/letz-lara…review/2653</div>
                        <div className="ml-auto">472</div>
                      </div>
                      <div className="flex mt-1.5">
                        <div>/rubick…review/1674</div>
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
                      <button className="w-full px-2 py-1 mt-4 border-dashed btn btn-outline-secondary">Real-Time
                        Report
                      </button>
                    </div>
                  </div>
                </div>




                <div className="col-span-12 mt-2 sm:col-span-6 lg:col-span-4 xl:col-span-3 lg:mt-6 xl:mt-2">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Users By Age
                    </h2>
                    <a href="" className="ml-auto truncate text-theme-1 dark:text-theme-10">Show More</a>
                  </div>
                  <div className="mt-5 report-box-2 intro-y">
                    <div className="p-5 box">
                      <div
                        className="justify-center w-4/5 mx-auto text-gray-600 bg-gray-200 rounded-md boxed-tabs nav nav-tabs dark:bg-dark-1 dark:text-gray-500"
                        role="tablist"><a data-toggle="tab" data-target="#active-users" href="javascript:;"
                                          className="btn flex-1 border-0 shadow-none py-1.5 px-2 active"
                                          id="active-users-tab" role="tab" aria-controls="active-users"
                                          aria-selected="true">Active</a> <a data-toggle="tab"
                                                                             data-target="#inactive-users"
                                                                             href="javascript:;"
                                                                             className="btn flex-1 border-0 shadow-none py-1.5 px-2"
                                                                             id="inactive-users-tab" role="tab"
                                                                             aria-selected="false">Inactive</a></div>
                      <div className="mt-6 tab-content">
                        <div className="tab-pane active" id="active-users" role="tabpanel"
                             aria-labelledby="active-users-tab">
                          <div className="relative">
                            <canvas className="mt-3" id="report-donut-chart" height="300"/>
                            <div
                              className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                              <div className="text-2xl font-medium">2.501</div>
                              <div className="text-gray-600 dark:text-gray-600 mt-0.5">Active Users</div>
                            </div>
                          </div>
                          <div className="mt-5">
                            <div className="flex items-center">
                              <div className="w-2 h-2 mr-3 rounded-full bg-theme-11"/>
                              <span className="truncate">17 - 30 Years old</span>
                              <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                              <span className="font-medium xl:ml-auto">62%</span>
                            </div>
                            <div className="flex items-center mt-4">
                              <div className="w-2 h-2 mr-3 rounded-full bg-theme-1"/>
                              <span className="truncate">31 - 50 Years old</span>
                              <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                              <span className="font-medium xl:ml-auto">33%</span>
                            </div>
                            <div className="flex items-center mt-4">
                              <div className="w-2 h-2 mr-3 rounded-full bg-theme-12"/>
                              <span className="truncate">= 50 Years old</span>
                              <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                              <span className="font-medium xl:ml-auto">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




                <div className="col-span-12 mt-6 lg:col-span-8">
                  <div className="items-center block h-10 intro-y sm:flex">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Official Store
                    </h2>
                    <div className="relative mt-3 text-gray-700 sm:ml-auto sm:mt-0 dark:text-gray-300">
                      <i data-feather="map-pin" className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"/>
                      <input type="text" className="pl-10 form-control sm:w-40 box" placeholder="Filter by city"/>
                    </div>
                  </div>
                  <div className="p-5 mt-12 intro-y box sm:mt-5">
                    <div>250 Official stores in 21 countries, click the marker to see location details.</div>
                    <div className="mt-5 bg-gray-200 rounded-md report-maps" data-center="-6.2425342, 106.8626478"
  data-sources="//dist/json/location.json"/>
                  </div>
                </div>




                <div className="col-span-12 mt-6 xl:col-span-4">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Weekly Best Sellers
                    </h2>
                  </div>
                  <div className="mt-5">
                    <div className="intro-y">
                      <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                          <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-5.jpg"/>
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Morgan Freeman</div>
                          <div className="text-gray-600 text-xs mt-0.5">13 August 2020</div>
                        </div>
                        <div
                          className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-theme-9">137
                          Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                          <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-3.jpg"/>
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Denzel Washington</div>
                          <div className="text-gray-600 text-xs mt-0.5">13 December 2022</div>
                        </div>
                        <div
                          className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-theme-9">137
                          Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                          <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-15.jpg"/>
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Kevin Spacey</div>
                          <div className="text-gray-600 text-xs mt-0.5">15 January 2022</div>
                        </div>
                        <div
                          className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-theme-9">137
                          Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                          <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-14.jpg"/>
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Sylvester Stallone</div>
                          <div className="text-gray-600 text-xs mt-0.5">8 July 2021</div>
                        </div>
                        <div
                          className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-theme-9">137
                          Sales
                        </div>
                      </div>
                    </div>
                    <a href=""
                       className="block w-full py-4 text-center border border-dotted rounded-md intro-y border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600">View
                      More</a>
                  </div>
                </div>




                <div className="col-span-12 mt-6 lg:col-span-6">
                  <div className="relative p-8 overflow-hidden ads-box box bg-theme-3 intro-y">
                    <div className="w-full -mt-3 text-xl text-white ads-box__title sm:w-72">Transact safely with
                      Lender’s Fund Account (RDL)
                    </div>
                    <div
                      className="w-full mt-3 leading-relaxed text-white sm:w-72 text-opacity-70 dark:text-gray-600 dark:text-opacity-100">Apply
                      now, quick registration
                    </div>
                    <button className="w-32 mt-6 bg-white btn dark:bg-dark-2 dark:text-white sm:mt-10">Start Now
                    </button>
                    <img className="absolute top-0 right-0 hidden w-2/5 mr-2 -mt-3 sm:block"
                         alt="Rubick Tailwind HTML Admin Template" src="/dist/images/woman-illustration.svg"/>
                  </div>
                </div>




                <div className="col-span-12 mt-6 lg:col-span-6">
                  <div className="relative p-8 overflow-hidden ads-box box intro-y">
                    <div className="w-full -mt-3 text-xl ads-box__title sm:w-52 text-theme-1 dark:text-white">Invite
                      friends to get <span className="font-medium">FREE</span> bonuses!
                    </div>
                    <div className="w-full mt-2 leading-relaxed text-gray-600 sm:w-60">Get a IDR 100,000 voucher by
                      inviting your friends to fund #BecomeMember
                    </div>
                    <div className="relative w-48 mt-6 cursor-pointer tooltip" title="Copy referral link">
                      <input className="form-control" value="https://dashboard.in"/>
                        <i data-feather="copy" className="absolute top-0 bottom-0 right-0 w-4 h-4 my-auto mr-4"/>
                    </div>
                    <img className="absolute top-0 right-0 hidden w-1/2 mt-1 -mr-12 sm:block"
                         alt="Rubick Tailwind HTML Admin Template" src="/dist/images/phone-illustration.svg"/>
                  </div>
                </div>




                <div className="col-span-12 mt-6">
                  <div className="items-center block h-10 intro-y sm:flex">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Weekly Top Products
                    </h2>
                    <div className="flex items-center mt-3 sm:ml-auto sm:mt-0">
                      <button className="flex items-center text-gray-700 btn box dark:text-gray-300"><i
  data-feather="file-text" className="hidden w-4 h-4 mr-2 sm:block"/> Export to Excel
                      </button>
                      <button className="flex items-center ml-3 text-gray-700 btn box dark:text-gray-300"><i
  data-feather="file-text" className="hidden w-4 h-4 mr-2 sm:block"/> Export to PDF
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
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
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-8.jpg" title="Uploaded at 13 August 2020"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-1.jpg" title="Uploaded at 10 August 2022"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-4.jpg" title="Uploaded at 23 November 2022"/>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="" className="font-medium whitespace-nowrap">Sony A7 III</a>
                          <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">Photography</div>
                        </td>
                        <td className="text-center">61</td>
                        <td className="w-40">
                          <div className="flex items-center justify-center text-theme-6"><i data-feather="check-square"
  className="w-4 h-4 mr-2"/> Inactive
                          </div>
                        </td>
                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square"
  className="w-4 h-4 mr-1"/> Edit </a>
                            <a className="flex items-center text-theme-6" href=""> <i data-feather="trash-2"
  className="w-4 h-4 mr-1"/> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-6.jpg" title="Uploaded at 13 December 2022"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-10.jpg" title="Uploaded at 3 September 2020"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-2.jpg" title="Uploaded at 11 June 2022"/>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="" className="font-medium whitespace-nowrap">Apple MacBook Pro 13</a>
                          <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">PC &amp; Laptop</div>
                        </td>
                        <td className="text-center">72</td>
                        <td className="w-40">
                          <div className="flex items-center justify-center text-theme-9"><i data-feather="check-square"
  className="w-4 h-4 mr-2"/> Active
                          </div>
                        </td>
                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square"
  className="w-4 h-4 mr-1"/> Edit </a>
                            <a className="flex items-center text-theme-6" href=""> <i data-feather="trash-2"
  className="w-4 h-4 mr-1"/> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-4.jpg" title="Uploaded at 15 January 2022"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-4.jpg" title="Uploaded at 19 July 2022"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-2.jpg" title="Uploaded at 17 January 2022"/>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="" className="font-medium whitespace-nowrap">Oppo Find X2 Pro</a>
                          <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">Smartphone &amp; Tablet</div>
                        </td>
                        <td className="text-center">140</td>
                        <td className="w-40">
                          <div className="flex items-center justify-center text-theme-6"><i data-feather="check-square"
  className="w-4 h-4 mr-2"/> Inactive
                          </div>
                        </td>
                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square"
  className="w-4 h-4 mr-1"/> Edit </a>
                            <a className="flex items-center text-theme-6" href=""> <i data-feather="trash-2"
  className="w-4 h-4 mr-1"/> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-8.jpg" title="Uploaded at 8 July 2021"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-4.jpg" title="Uploaded at 21 July 2022"/>
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <img alt="Rubick Tailwind HTML Admin Template" className="rounded-full tooltip"
                                   src="/dist/images/preview-5.jpg" title="Uploaded at 25 January 2021"/>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="" className="font-medium whitespace-nowrap">Nikon Z6</a>
                          <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">Photography</div>
                        </td>
                        <td className="text-center">110</td>
                        <td className="w-40">
                          <div className="flex items-center justify-center text-theme-9"><i data-feather="check-square"
  className="w-4 h-4 mr-2"/> Active
                          </div>
                        </td>
                        <td className="w-56 table-report__action">
                          <div className="flex items-center justify-center">
                            <a className="flex items-center mr-3" href=""> <i data-feather="check-square"
  className="w-4 h-4 mr-1"/> Edit </a>
                            <a className="flex items-center text-theme-6" href=""> <i data-feather="trash-2"
  className="w-4 h-4 mr-1"/> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap">
                    <ul className="pagination">
                      <li>
                        <a className="pagination__link" href=""> <i className="w-4 h-4"
  data-feather="chevrons-left"/> </a>
                      </li>
                      <li>
                        <a className="pagination__link" href=""> <i className="w-4 h-4" data-feather="chevron-left"/>
                        </a>
                      </li>
                      <li><a className="pagination__link" href="">...</a></li>
                      <li><a className="pagination__link" href="">1</a></li>
                      <li><a className="pagination__link pagination__link--active" href="">2</a></li>
                      <li><a className="pagination__link" href="">3</a></li>
                      <li><a className="pagination__link" href="">...</a></li>
                      <li>
                        <a className="pagination__link" href=""> <i className="w-4 h-4"
  data-feather="chevron-right"/> </a>
                      </li>
                      <li>
                        <a className="pagination__link" href=""> <i className="w-4 h-4"
  data-feather="chevrons-right"/> </a>
                      </li>
                    </ul>
                    <select className="w-20 mt-3 form-select box sm:mt-0">
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
              <div className="pb-10 -mb-10 2xl:border-l border-theme-5">
                <div className="grid grid-cols-12 gap-6 2xl:pl-6">


                  <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-12 2xl:mt-8">
                    <div className="flex items-center h-10 intro-x">
                      <h2 className="mr-auto text-lg font-medium truncate">
                        Important Notes
                      </h2>
                      <button data-carousel="important-notes" data-target="prev"
                              className="px-2 mr-2 text-gray-700 border-gray-400 tiny-slider-navigator btn dark:text-gray-300">
                        <i data-feather="chevron-left" className="w-4 h-4"/></button>
                      <button data-carousel="important-notes" data-target="next"
                              className="px-2 mr-2 text-gray-700 border-gray-400 tiny-slider-navigator btn dark:text-gray-300">
                        <i data-feather="chevron-right" className="w-4 h-4"/></button>
                    </div>
                    <div className="mt-5 intro-x">
                      <div className="box zoom-in">
                        <div className="tiny-slider" id="important-notes">
                          <div className="p-5">
                            <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                            <div className="mt-1 text-gray-500">20 Hours ago</div>
                            <div className="mt-1 text-justify text-gray-600">Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
                              ever since the 1500s.
                            </div>
                            <div className="flex mt-5 font-medium">
                              <button type="button" className="px-2 py-1 btn btn-secondary">View Notes</button>
                              <button type="button"
                                      className="px-2 py-1 ml-auto btn btn-outline-secondary">Dismiss
                              </button>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                            <div className="mt-1 text-gray-500">20 Hours ago</div>
                            <div className="mt-1 text-justify text-gray-600">Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
                              ever since the 1500s.
                            </div>
                            <div className="flex mt-5 font-medium">
                              <button type="button" className="px-2 py-1 btn btn-secondary">View Notes</button>
                              <button type="button"
                                      className="px-2 py-1 ml-auto btn btn-outline-secondary">Dismiss
                              </button>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                            <div className="mt-1 text-gray-500">20 Hours ago</div>
                            <div className="mt-1 text-justify text-gray-600">Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
                              ever since the 1500s.
                            </div>
                            <div className="flex mt-5 font-medium">
                              <button type="button" className="px-2 py-1 btn btn-secondary">View Notes</button>
                              <button type="button"
                                      className="px-2 py-1 ml-auto btn btn-outline-secondary">Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    <div className="flex items-center h-10 intro-x">
                      <h2 className="mr-5 text-lg font-medium truncate">
                        Recent Activities
                      </h2>
                      <a href="" className="ml-auto truncate text-theme-1 dark:text-theme-10">Show More</a>
                    </div>
                    <div className="relative mt-5 report-timeline">
                      <div className="relative flex items-center mb-3 intro-x">
                        <div className="report-timeline__image">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-13.jpg"/>
                          </div>
                        </div>
                        <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Russell Crowe</div>
                            <div className="ml-auto text-xs text-gray-500">07:00 PM</div>
                          </div>
                          <div className="mt-1 text-gray-600">Has joined the team</div>
                        </div>
                      </div>
                      <div className="relative flex items-center mb-3 intro-x">
                        <div className="report-timeline__image">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-13.jpg"/>
                          </div>
                        </div>
                        <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Leonardo DiCaprio</div>
                            <div className="ml-auto text-xs text-gray-500">07:00 PM</div>
                          </div>
                          <div className="text-gray-600">
                            <div className="mt-1">Added 3 new photos</div>
                            <div className="flex mt-2">
                              <div className="w-8 h-8 mr-1 tooltip image-fit zoom-in" title="Sony A7 III">
                                <img alt="Rubick Tailwind HTML Admin Template"
                                     className="border border-white rounded-md" src="/dist/images/preview-6.jpg"/>
                              </div>
                              <div className="w-8 h-8 mr-1 tooltip image-fit zoom-in" title="Apple MacBook Pro 13">
                                <img alt="Rubick Tailwind HTML Admin Template"
                                     className="border border-white rounded-md" src="/dist/images/preview-14.jpg"/>
                              </div>
                              <div className="w-8 h-8 mr-1 tooltip image-fit zoom-in" title="Oppo Find X2 Pro">
                                <img alt="Rubick Tailwind HTML Admin Template"
                                     className="border border-white rounded-md" src="/dist/images/preview-9.jpg"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-4 text-xs text-center text-gray-500 intro-x">12 November</div>
                      <div className="relative flex items-center mb-3 intro-x">
                        <div className="report-timeline__image">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-13.jpg"/>
                          </div>
                        </div>
                        <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Leonardo DiCaprio</div>
                            <div className="ml-auto text-xs text-gray-500">07:00 PM</div>
                          </div>
                          <div className="mt-1 text-gray-600">Has changed <a className="text-theme-1 dark:text-theme-10"
                                                                             href="">Samsung Galaxy S20 Ultra</a> price
                            and description
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center mb-3 intro-x">
                        <div className="report-timeline__image">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-3.jpg"/>
                          </div>
                        </div>
                        <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Keanu Reeves</div>
                            <div className="ml-auto text-xs text-gray-500">07:00 PM</div>
                          </div>
                          <div className="mt-1 text-gray-600">Has changed <a className="text-theme-1 dark:text-theme-10"
                                                                             href="">Nike Air Max 270</a> description
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    <div className="flex items-center h-10 intro-x">
                      <h2 className="mr-5 text-lg font-medium truncate">
                        Transactions
                      </h2>
                    </div>
                    <div className="mt-5">
                      <div className="intro-x">
                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-5.jpg"/>
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Morgan Freeman</div>
                            <div className="text-gray-600 text-xs mt-0.5">13 August 2020</div>
                          </div>
                          <div className="text-theme-6">-$42</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-3.jpg"/>
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Denzel Washington</div>
                            <div className="text-gray-600 text-xs mt-0.5">13 December 2022</div>
                          </div>
                          <div className="text-theme-9">+$29</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-15.jpg"/>
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Kevin Spacey</div>
                            <div className="text-gray-600 text-xs mt-0.5">15 January 2022</div>
                          </div>
                          <div className="text-theme-6">-$153</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-14.jpg"/>
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Sylvester Stallone</div>
                            <div className="text-gray-600 text-xs mt-0.5">8 July 2021</div>
                          </div>
                          <div className="text-theme-9">+$60</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                          <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                            <img alt="Rubick Tailwind HTML Admin Template" src="/dist/images/profile-3.jpg"/>
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Johnny Depp</div>
                            <div className="text-gray-600 text-xs mt-0.5">18 October 2021</div>
                          </div>
                          <div className="text-theme-9">+$23</div>
                        </div>
                      </div>
                      <a href=""
                         className="block w-full py-3 text-center border border-dotted rounded-md intro-x border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600">View
                        More</a>
                    </div>
                  </div>




                  <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    <div className="flex items-center h-10 intro-x">
                      <h2 className="mr-5 text-lg font-medium truncate">
                        Schedules
                      </h2>
                      <a href="" className="flex items-center ml-auto truncate text-theme-1 dark:text-theme-10"> <i
  data-feather="plus" className="w-4 h-4 mr-1"/> Add New Schedules </a>
                    </div>
                    <div className="mt-5">
                      <div className="intro-x box">
                        <div className="p-5">
                          <div className="flex">
                            <i data-feather="chevron-left" className="w-5 h-5 text-gray-600"/>
                            <div className="mx-auto text-base font-medium">April</div>
                            <i data-feather="chevron-right" className="w-5 h-5 text-gray-600"/>
                          </div>
                          <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                            <div className="font-medium">Su</div>
                            <div className="font-medium">Mo</div>
                            <div className="font-medium">Tu</div>
                            <div className="font-medium">We</div>
                            <div className="font-medium">Th</div>
                            <div className="font-medium">Fr</div>
                            <div className="font-medium">Sa</div>
                            <div className="py-0.5 rounded relative text-gray-600">29</div>
                            <div className="py-0.5 rounded relative text-gray-600">30</div>
                            <div className="py-0.5 rounded relative text-gray-600">31</div>
                            <div className="py-0.5 rounded relative">1</div>
                            <div className="py-0.5 rounded relative">2</div>
                            <div className="py-0.5 rounded relative">3</div>
                            <div className="py-0.5 rounded relative">4</div>
                            <div className="py-0.5 rounded relative">5</div>
                            <div className="py-0.5 bg-theme-18 dark:bg-theme-9 rounded relative">6</div>
                            <div className="py-0.5 rounded relative">7</div>
                            <div className="py-0.5 bg-theme-1 dark:bg-theme-1 text-white rounded relative">8</div>
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
                            <div className="py-0.5 bg-theme-17 dark:bg-theme-11 rounded relative">23</div>
                            <div className="py-0.5 rounded relative">24</div>
                            <div className="py-0.5 rounded relative">25</div>
                            <div className="py-0.5 rounded relative">26</div>
                            <div className="py-0.5 bg-theme-14 dark:bg-theme-12 rounded relative">27</div>
                            <div className="py-0.5 rounded relative">28</div>
                            <div className="py-0.5 rounded relative">29</div>
                            <div className="py-0.5 rounded relative">30</div>
                            <div className="py-0.5 rounded relative text-gray-600">1</div>
                            <div className="py-0.5 rounded relative text-gray-600">2</div>
                            <div className="py-0.5 rounded relative text-gray-600">3</div>
                            <div className="py-0.5 rounded relative text-gray-600">4</div>
                            <div className="py-0.5 rounded relative text-gray-600">5</div>
                            <div className="py-0.5 rounded relative text-gray-600">6</div>
                            <div className="py-0.5 rounded relative text-gray-600">7</div>
                            <div className="py-0.5 rounded relative text-gray-600">8</div>
                            <div className="py-0.5 rounded relative text-gray-600">9</div>
                          </div>
                        </div>
                        <div className="p-5 border-t border-gray-200">
                          <div className="flex items-center">
                            <div className="w-2 h-2 mr-3 rounded-full bg-theme-11"/>
                            <span className="truncate">UI/UX Workshop</span>
                            <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                            <span className="font-medium xl:ml-auto">23th</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 mr-3 rounded-full bg-theme-1 dark:bg-theme-10"/>
                            <span className="truncate">VueJs Frontend Development</span>
                            <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                            <span className="font-medium xl:ml-auto">10th</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 mr-3 rounded-full bg-theme-12"/>
                            <span className="truncate">Laravel Rest API</span>
                            <div
  className="flex-1 h-px mx-3 border border-r border-gray-300 border-dashed xl:hidden"/>
                            <span className="font-medium xl:ml-auto">31th</span>
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
  );
}

export default Index;
