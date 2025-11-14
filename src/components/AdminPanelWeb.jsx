import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Users, Award, Home, Trophy, Settings, BarChart3, Star, Calendar, Shirt, Activity, Menu, ChevronRight } from 'lucide-react';

export default function AdminPanelWeb() {
  const [currentSection, setCurrentSection] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [modalEntity, setModalEntity] = useState('user');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const rolePermissions = {
    'Admin': ['crear_liga', 'editar_liga', 'eliminar_liga', 'gestionar_usuarios', 'ver_reportes', 'configuracion'],
    'Moderador': ['editar_liga', 'ver_reportes', 'ver_liga'],
    'Usuario': ['ver_liga', 'participar']
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'Carlos Méndez', email: 'carlos@email.com', role: 'Admin', status: 'Activo', avatar: 'CM', color: '#2776F5', lastActive: '2 min' },
    { id: 2, name: 'María García', email: 'maria@email.com', role: 'Usuario', status: 'Activo', avatar: 'MG', color: '#27F5AD', lastActive: '5 min' },
    { id: 3, name: 'Juan Pérez', email: 'juan@email.com', role: 'Usuario', status: 'Inactivo', avatar: 'JP', color: '#2787F5', lastActive: '2 días' },
    { id: 4, name: 'Ana Rodríguez', email: 'ana@email.com', role: 'Moderador', status: 'Activo', avatar: 'AR', color: '#27F5F1', lastActive: '15 min' },
  ]);

  const [players, setPlayers] = useState([
    { id: 1, name: 'Lionel Messi', position: 'Delantero', team: 'FC Barcelona', age: 36, number: 10, status: 'Activo', rating: 95, avatar: 'LM', color: '#27F5AD' },
    { id: 2, name: 'Cristiano Ronaldo', position: 'Delantero', team: 'Al Nassr', age: 38, number: 7, status: 'Activo', rating: 94, avatar: 'CR', color: '#2776F5' },
    { id: 3, name: 'Neymar Jr', position: 'Extremo', team: 'Al Hilal', age: 31, number: 11, status: 'Lesionado', rating: 89, avatar: 'NJ', color: '#27F5F1' },
    { id: 4, name: 'Kylian Mbappé', position: 'Delantero', team: 'PSG', age: 25, number: 7, status: 'Activo', rating: 91, avatar: 'KM', color: '#2735F5' },
  ]);

  const [leagues, setLeagues] = useState([
    { id: 1, name: 'Liga Premier 2024', type: 'Profesional', startDate: '2024-01-15', endDate: '2024-06-30', teams: 16, status: 'En Curso', prize: '$50,000', color: '#2776F5' },
    { id: 2, name: 'Copa Libertadores', type: 'Torneo', startDate: '2024-02-01', endDate: '2024-11-30', teams: 32, status: 'Inscripción', prize: '$100,000', color: '#27F5AD' },
    { id: 3, name: 'Liga Amateur', type: 'Amateur', startDate: '2024-03-10', endDate: '2024-08-15', teams: 8, status: 'Programada', prize: '$5,000', color: '#27F5F1' },
    { id: 4, name: 'Champions League', type: 'Profesional', startDate: '2024-05-01', endDate: '2024-12-31', teams: 24, status: 'En Curso', prize: '$200,000', color: '#2735F5' },
  ]);

  const menuSections = [
    { id: 'users', label: 'Usuarios', icon: Users, color: '#2776F5' },
  ];

  const openModal = (type, entity, item = null) => {
    setModalType(type);
    setModalEntity(entity);
    setSelectedItem(item);
    
    if (entity === 'user') {
      if (item) {
        setFormData({ 
          name: item.name, 
          email: item.email, 
          role: item.role, 
          status: item.status,
          permissions: rolePermissions[item.role] || []
        });
      } else {
        setFormData({ 
          name: '', 
          email: '', 
          role: 'Usuario', 
          status: 'Activo',
          permissions: rolePermissions['Usuario']
        });
      }
    } else if (entity === 'player') {
      if (item) {
        setFormData({
          name: item.name,
          position: item.position,
          team: item.team,
          age: item.age,
          number: item.number,
          status: item.status,
          rating: item.rating
        });
      } else {
        setFormData({
          name: '',
          position: 'Delantero',
          team: '',
          age: '',
          number: '',
          status: 'Activo',
          rating: 75
        });
      }
    } else if (entity === 'league') {
      if (item) {
        setFormData({
          name: item.name,
          type: item.type,
          startDate: item.startDate,
          endDate: item.endDate,
          teams: item.teams,
          status: item.status,
          prize: item.prize
        });
      } else {
        setFormData({
          name: '',
          type: 'Profesional',
          startDate: '',
          endDate: '',
          teams: 8,
          status: 'Programada',
          prize: ''
        });
      }
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleDelete = (entity, id) => {
    if (window.confirm('¿Estás seguro de eliminar este elemento?')) {
      if (entity === 'user') setUsers(users.filter(u => u.id !== id));
      if (entity === 'player') setPlayers(players.filter(p => p.id !== id));
      if (entity === 'league') setLeagues(leagues.filter(l => l.id !== id));
    }
  };

  const handleSubmit = () => {
    if (modalEntity === 'user') {
      if (!formData.name || !formData.email) {
        alert('Por favor completa todos los campos');
        return;
      }
      if (modalType === 'create') {
        const colors = ['#2776F5', '#27F5AD', '#2787F5', '#27F5F1', '#2735F5', '#78CFF5'];
        const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const newUser = {
          id: users.length + 1,
          ...formData,
          avatar: initials,
          color: colors[Math.floor(Math.random() * colors.length)],
          lastActive: 'Ahora'
        };
        setUsers([...users, newUser]);
      } else {
        setUsers(users.map(u => u.id === selectedItem.id ? { ...u, ...formData } : u));
      }
    } else if (modalEntity === 'player') {
      if (modalType === 'create') {
        const colors = ['#2776F5', '#27F5AD', '#2787F5', '#27F5F1', '#2735F5', '#78CFF5'];
        const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const newPlayer = {
          id: players.length + 1,
          ...formData,
          avatar: initials,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        setPlayers([...players, newPlayer]);
      } else {
        setPlayers(players.map(p => p.id === selectedItem.id ? { ...p, ...formData } : p));
      }
    } else if (modalEntity === 'league') {
      if (modalType === 'create') {
        const colors = ['#2776F5', '#27F5AD', '#2787F5', '#27F5F1', '#2735F5', '#78CFF5'];
        const newLeague = {
          id: leagues.length + 1,
          ...formData,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        setLeagues([...leagues, newLeague]);
      } else {
        setLeagues(leagues.map(l => l.id === selectedItem.id ? { ...l, ...formData } : l));
      }
    }
    closeModal();
  };

  const getStatusColor = (status) => {
    if (status === 'Activo' || status === 'En Curso') return '#27F5AD';
    if (status === 'Inactivo' || status === 'Finalizada') return '#78CFF5';
    if (status === 'Lesionado') return '#F52757';
    if (status === 'Inscripción' || status === 'Programada') return '#2776F5';
    return '#78CFF5';
  };

  const getPositionColor = (position) => {
    if (position === 'Delantero') return '#27F5AD';
    if (position === 'Mediocampista') return '#2776F5';
    if (position === 'Defensa') return '#2735F5';
    if (position === 'Portero') return '#27F5F1';
    return '#78CFF5';
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2" style={{ 
          fontFamily: "'Segoe UI', sans-serif",
          background: 'linear-gradient(135deg, #27F5F1 0%, #2776F5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Dashboard
        </h2>
        <p className="text-gray-400 text-sm">Resumen general del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        <div className="rounded-2xl p-6 transform hover:scale-105 transition-all cursor-pointer" style={{ 
          background: 'linear-gradient(135deg, rgba(39, 118, 245, 0.15) 0%, rgba(39, 118, 245, 0.05) 100%)',
          border: '1px solid rgba(39, 118, 245, 0.3)',
          boxShadow: '0 8px 32px rgba(39, 118, 245, 0.1)'
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(39, 118, 245, 0.2)' }}>
              <Users size={28} color="#2776F5" />
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2776F5' }}></div>
          </div>
          <p className="text-4xl font-bold mb-2" style={{ color: '#2776F5', fontFamily: "'Segoe UI', sans-serif" }}>
            {users.length}
          </p>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Usuarios Totales</p>
          <p className="text-xs mt-2" style={{ color: '#27F5AD' }}>+2 esta semana</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl p-6" style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 className="text-white font-bold mb-6 text-lg">Actividad Reciente</h3>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${user.color} 0%, ${user.color}cc 100%)` }}
                >
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs">Activo hace {user.lastActive}</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: user.status === 'Activo' ? '#27F5AD' : '#78CFF5' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => {
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#2776F5' }}>Gestión de Usuarios</h2>
            <p className="text-gray-400 text-sm">Administra todos los usuarios del sistema</p>
          </div>
          <button
            onClick={() => openModal('create', 'user')}
            className="px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #2776F5 0%, #2735F5 100%)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(39, 118, 245, 0.4)'
            }}
          >
            <Plus size={20} />
            Nuevo Usuario
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#27F5F1' }} />
          <input
            type="text"
            placeholder="Buscar usuarios por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(39, 245, 241, 0.2)',
              fontSize: '15px'
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div 
              key={user.id}
              className="rounded-2xl p-6 transform hover:scale-105 transition-all"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${user.color} 0%, ${user.color}cc 100%)` }}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full" style={{ 
                  background: user.status === 'Activo' ? '#27F5AD' : '#78CFF5',
                  boxShadow: `0 0 12px ${user.status === 'Activo' ? '#27F5AD' : '#78CFF5'}`
                }}></div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-2 rounded-lg text-sm font-medium" style={{ 
                  background: 'rgba(39, 118, 245, 0.2)',
                  color: '#2776F5',
                  border: '1px solid rgba(39, 118, 245, 0.3)'
                }}>
                  {user.role}
                </span>
                <span className="px-3 py-2 rounded-lg text-sm font-medium" style={{ 
                  background: user.status === 'Activo' ? 'rgba(39, 245, 173, 0.2)' : 'rgba(120, 207, 245, 0.2)',
                  color: user.status === 'Activo' ? '#27F5AD' : '#78CFF5',
                  border: user.status === 'Activo' ? '1px solid rgba(39, 245, 173, 0.3)' : '1px solid rgba(120, 207, 245, 0.3)'
                }}>
                  {user.status}
                </span>
              </div>

              <p className="text-gray-400 text-xs mb-4">Última actividad: {user.lastActive}</p>

              <div className="flex gap-3">
                <button 
                  onClick={() => openModal('edit', 'user', user)}
                  className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 transition-all"
                  style={{ 
                    background: 'rgba(39, 118, 245, 0.2)',
                    border: '1px solid rgba(39, 118, 245, 0.4)',
                    color: '#2776F5'
                  }}
                >
                  <Edit2 size={18} />
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete('user', user.id)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  style={{ 
                    background: 'rgba(245, 39, 87, 0.2)',
                    border: '1px solid rgba(245, 39, 87, 0.4)'
                  }}
                >
                  <Trash2 size={20} color="#F52757" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };





  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.85)' }}
        onClick={closeModal}
      >
        <div 
          className="w-full max-w-2xl rounded-2xl p-8 backdrop-blur-xl"
          style={{ 
            background: 'linear-gradient(180deg, rgba(10, 15, 30, 0.98) 0%, rgba(26, 31, 53, 0.98) 100%)',
            border: '1px solid rgba(39, 245, 241, 0.2)',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ 
              fontFamily: "'Segoe UI', sans-serif",
              background: 'linear-gradient(135deg, #27F5F1 0%, #2776F5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {modalType === 'create' ? 'Crear ' : 'Editar '}
              {modalEntity === 'user' ? 'Usuario' : modalEntity === 'player' ? 'Jugador' : 'Liga'}
            </h2>
            <button 
              onClick={closeModal}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <X size={20} color="#78CFF5" />
            </button>
          </div>

          <div className="space-y-5">
            {modalEntity === 'user' && (
              <>
                <div>
                  <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(39, 245, 241, 0.2)'
                    }}
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(39, 245, 241, 0.2)'
                    }}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Rol
                    </label>
                    <select
                      value={formData.role || 'Usuario'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Admin" style={{ background: '#0a0f1e' }}>Admin</option>
                      <option value="Moderador" style={{ background: '#0a0f1e' }}>Moderador</option>
                      <option value="Usuario" style={{ background: '#0a0f1e' }}>Usuario</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Estado
                    </label>
                    <select
                      value={formData.status || 'Activo'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Activo" style={{ background: '#0a0f1e' }}>Activo</option>
                      <option value="Inactivo" style={{ background: '#0a0f1e' }}>Inactivo</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {modalEntity === 'player' && (
              <>
                <div>
                  <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                    Nombre del Jugador
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(39, 245, 241, 0.2)'
                    }}
                    placeholder="Ej: Lionel Messi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Posición
                    </label>
                    <select
                      value={formData.position || 'Delantero'}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Portero" style={{ background: '#0a0f1e' }}>Portero</option>
                      <option value="Defensa" style={{ background: '#0a0f1e' }}>Defensa</option>
                      <option value="Mediocampista" style={{ background: '#0a0f1e' }}>Mediocampista</option>
                      <option value="Delantero" style={{ background: '#0a0f1e' }}>Delantero</option>
                      <option value="Extremo" style={{ background: '#0a0f1e' }}>Extremo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Número
                    </label>
                    <input
                      type="number"
                      value={formData.number || ''}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                    Equipo
                  </label>
                  <input
                    type="text"
                    value={formData.team || ''}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(39, 245, 241, 0.2)'
                    }}
                    placeholder="FC Barcelona"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Edad
                    </label>
                    <input
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Rating
                    </label>
                    <input
                      type="number"
                      value={formData.rating || ''}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                      placeholder="85"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Estado
                    </label>
                    <select
                      value={formData.status || 'Activo'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Activo" style={{ background: '#0a0f1e' }}>Activo</option>
                      <option value="Lesionado" style={{ background: '#0a0f1e' }}>Lesionado</option>
                      <option value="Suspendido" style={{ background: '#0a0f1e' }}>Suspendido</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {modalEntity === 'league' && (
              <>
                <div>
                  <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                    Nombre de la Liga
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(39, 245, 241, 0.2)'
                    }}
                    placeholder="Liga Premier 2024"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Tipo de Liga
                    </label>
                    <select
                      value={formData.type || 'Profesional'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Profesional" style={{ background: '#0a0f1e' }}>Profesional</option>
                      <option value="Amateur" style={{ background: '#0a0f1e' }}>Amateur</option>
                      <option value="Torneo" style={{ background: '#0a0f1e' }}>Torneo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Estado
                    </label>
                    <select
                      value={formData.status || 'Programada'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    >
                      <option value="Programada" style={{ background: '#0a0f1e' }}>Programada</option>
                      <option value="Inscripción" style={{ background: '#0a0f1e' }}>Inscripción</option>
                      <option value="En Curso" style={{ background: '#0a0f1e' }}>En Curso</option>
                      <option value="Finalizada" style={{ background: '#0a0f1e' }}>Finalizada</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      value={formData.startDate || ''}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      value={formData.endDate || ''}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Número de Equipos
                    </label>
                    <input
                      type="number"
                      value={formData.teams || ''}
                      onChange={(e) => setFormData({ ...formData, teams: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                      placeholder="16"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 ml-1 font-semibold text-xs uppercase tracking-wider">
                      Premio
                    </label>
                    <input
                      type="text"
                      value={formData.prize || ''}
                      onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl text-white outline-none focus:ring-2"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(39, 245, 241, 0.2)'
                      }}
                      placeholder="$50,000"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-4 rounded-xl font-semibold hover:scale-105 transition-all"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 rounded-xl font-semibold hover:scale-105 transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #27F5F1 0%, #2776F5 100%)',
                  color: '#0a0f1e',
                  boxShadow: '0 8px 24px rgba(39, 245, 241, 0.4)'
                }}
              >
                {modalType === 'create' ? 'Crear' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex" style={{ 
      background: 'linear-gradient(180deg, #0a0f1e 0%, #151a2e 50%, #1a1f35 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div 
        className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r flex flex-col`}
        style={{
          background: 'linear-gradient(180deg, rgba(10, 15, 30, 0.95) 0%, rgba(21, 26, 46, 0.95) 100%)',
          borderRight: '1px solid rgba(39, 245, 241, 0.1)'
        }}
      >
        <div className="p-6 border-b" style={{ borderBottom: '1px solid rgba(39, 245, 241, 0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            {!sidebarCollapsed && (
              <h1 className="text-2xl font-bold" style={{ 
                fontFamily: "'Segoe UI', sans-serif",
                background: 'linear-gradient(135deg, #27F5F1 0%, #2776F5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Admin Panel
              </h1>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
              style={{ background: 'rgba(39, 245, 241, 0.1)' }}
            >
              <Menu size={20} color="#27F5F1" />
            </button>
          </div>
          {!sidebarCollapsed && (
            <p className="text-gray-500 text-xs">Sistema de gestión deportiva</p>
          )}
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setCurrentSection(section.id);
                setSearchTerm('');
              }}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                currentSection === section.id ? 'scale-105' : 'hover:scale-105'
              }`}
              style={{ 
                background: currentSection === section.id 
                  ? `linear-gradient(135deg, ${section.color}30 0%, ${section.color}10 100%)`
                  : 'rgba(255, 255, 255, 0.02)',
                border: currentSection === section.id
                  ? `1px solid ${section.color}60`
                  : '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-10 h-10'} rounded-lg flex items-center justify-center`} style={{ 
                background: currentSection === section.id ? `${section.color}40` : 'rgba(255, 255, 255, 0.05)'
              }}>
                <section.icon size={20} color={currentSection === section.id ? section.color : '#78CFF5'} />
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left font-medium" style={{ 
                    color: currentSection === section.id ? section.color : '#78CFF5',
                    fontSize: '14px'
                  }}>
                    {section.label}
                  </span>
                  {currentSection === section.id && (
                    <ChevronRight size={18} color={section.color} />
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t" style={{ borderTop: '1px solid rgba(39, 245, 241, 0.1)' }}>
          {!sidebarCollapsed ? (
            <div className="p-4 rounded-xl" style={{ 
              background: 'rgba(39, 245, 241, 0.1)',
              border: '1px solid rgba(39, 245, 241, 0.2)'
            }}>
              <p className="text-gray-300 text-xs mb-2 font-semibold">Admin Panel v2.0</p>
              <p className="text-gray-500 text-xs">
                Gestión completa para tu liga deportiva
              </p>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto" style={{ 
              background: 'rgba(39, 245, 241, 0.1)',
              border: '1px solid rgba(39, 245, 241, 0.2)'
            }}>
              <Settings size={20} color="#27F5F1" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 backdrop-blur-xl border-b" style={{
          background: 'rgba(10, 15, 30, 0.9)',
          borderBottom: '1px solid rgba(39, 245, 241, 0.1)'
        }}>
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {menuSections.find(s => s.id === currentSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {currentSection === 'dashboard' && 'Panel de control general'}
                {currentSection === 'users' && 'Gestiona los usuarios del sistema'}
                {currentSection === 'players' && 'Administra jugadores registrados'}
                {currentSection === 'leagues' && 'Controla ligas y torneos'}
                {currentSection === 'analytics' && 'Estadísticas y métricas'}
                {currentSection === 'settings' && 'Configuración del sistema'}
              </p>
            </div>
            {(currentSection === 'users') && (
              <button
                onClick={() => openModal('create', 'user')}
                className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${menuSections.find(s => s.id === currentSection)?.color} 0%, ${menuSections.find(s => s.id === currentSection)?.color}cc 100%)`,
                  color: '#fff',
                  boxShadow: `0 8px 24px ${menuSections.find(s => s.id === currentSection)?.color}40`
                }}
              >
                <Plus size={20} />
                Crear Nuevo
              </button>
            )}
          </div>
        </div>

        <div className="p-8">
          {currentSection === 'users' && renderUsers()}
        </div>
      </div>

      {renderModal()}
    </div>
  );
}