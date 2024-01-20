<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->

    <a href="home" class="brand-link">
      <img src="logo.png" alt="logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Perpustakaan </span>
    </a>



    <!-- Sidebar -->
    <div class="sidebar h-100">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          
        </div>
        
        <div class="info">
            
            <img src="logo_member.png" alt="logo_member" class="brand-image img-circle elevation-3" style="opacity: .8">
          {{-- <span class="brand-text text-light pl-2"> {{auth()->user()->username}} </span> --}}
        </div>
      </div>

      <!-- SidebarSearch Form -->
    

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
        {{-- @if(auth()->user()->role_id == 2) --}}
        <li class="nav-item menu-open">
    
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ url('home') }}" class="nav-link {{ Request::is('home*') ? 'active' : '' }}">
                <i class="far fa-circle nav-icon"></i>
                <p>Beranda</p>
              </a>
            </li>
     

              
              
            {{-- @endif --}}
        <div class="mb-auto h-100 d-flex align-items-end justify-content-center">
            <a href="/" class="btn btn-success text-center">
         Logout
    </a>
</div>
      </nav>
      
      <!-- /.sidebar-menu -->
    </div>
    
    <!-- /.sidebar -->
  </aside>
  