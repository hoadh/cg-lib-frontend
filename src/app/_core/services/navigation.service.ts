import { ROLES } from '../models/roles';
import { Injectable, Inject } from '@angular/core';
import { USER_ROLE } from '../tokens/user-role';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigation = {};
  constructor(
    @Inject(USER_ROLE) public userRole
  ) {
    // Icon: https://themify.me/themify-icons
    this.navigation[ROLES.ADMIN] = [
      {
        title: 'Thống kê',
        icon: 'ti-stats-up',
        items: [
          {
            title: 'Thống kê sách',
            routeLink: ['/admin/stats/books']
          },
          {
            title: 'Thống kê mượn/trả',
            routeLink: ['/admin/stats/borrow-return']
          },
        ]
      },
      {
        title: 'Quản lý thư viện',
        icon: 'ti-home',
        items: [
          {
            title: 'Danh sách thư viện',
            routeLink: ['/admin/libraries/list']
          },
          {
            title: 'Thêm thư viện',
            routeLink: ['/admin/libraries/add']
          },
        ]
      },
      {
        title: 'Quản lý thủ thư',
        icon: 'ti-user',
        items: [
          {
            title: 'Danh sách thủ thư',
            routeLink: ['/admin/users/list']
          },
          {
            title: 'Tạo tài khoản thủ thư',
            routeLink: ['/admin/users/add']
          },
        ]
      },
      {
        title: 'Danh mục sách',
        icon: 'ti-bookmark-alt',
        items: [
          {
            title: 'Danh sách danh mục sách',
            routeLink: ['/admin/categories/list']
          },
          {
            title: 'Thêm danh mục sách',
            routeLink: ['/admin/categories/add']
          },
        ]
      }
    ];

    this.navigation[ROLES.LIBRARIAN] = [
      {
        title: 'Quản lý sách',
        icon: 'ti-bookmark-alt',
        items: [
          {
            title: 'Sách trong thư viện',
            routeLink: ['/lib/books/list']
          },
          {
            title: 'Nhập một cuốn sách',
            routeLink: ['/lib/books/add']
          },
          {
            title: 'Nhập sách từ Excel',
            routeLink: ['/lib/books/import']
          },
        ]
      },
      {
        title: 'Quản lý khách hàng',
        icon: 'ti-bookmark-alt',
        items: [
          {
            title: 'Danh sách khách hàng',
            routeLink: ['/lib/customers/list']
          },
          {
            title: 'Thêm khách hàng',
            routeLink: ['/lib/customers/add']
          }
        ]
      },
      {
        title: 'Quản lý mượn/trả',
        icon: 'ti-bookmark-alt',
        items: [
          {
            title: 'Danh sách đang mượn',
            routeLink: ['/lib/books/borrowing']
          },
          {
            title: 'Mượn sách',
            routeLink: ['/lib/books/borrow']
          },
        ]
      }
    ];
  }

  getNativation() {
    const role = localStorage.getItem(this.userRole);
    return (role) ? this.navigation[role] : [];
  }
}
