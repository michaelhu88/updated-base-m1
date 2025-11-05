import { useState } from 'react';
import {
  Users,
  UserPlus,
  Building2,
  Calendar,
  TrendingUp,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';

// Types
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

interface Department {
  name: string;
  headCount: number;
  budget: number;
}

type TabType = 'overview' | 'employees' | 'leave' | 'departments';

const HR = () => {
  // State Management
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Mock Data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 120000,
      hireDate: '2022-01-15',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 95000,
      hireDate: '2021-06-20',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 85000,
      hireDate: '2023-03-10',
      status: 'On Leave',
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: '3',
      employeeName: 'Emily Rodriguez',
      type: 'Vacation',
      startDate: '2025-11-10',
      endDate: '2025-11-20',
      status: 'Approved',
      reason: 'Family vacation',
    },
    {
      id: '2',
      employeeId: '1',
      employeeName: 'Sarah Johnson',
      type: 'Sick Leave',
      startDate: '2025-11-05',
      endDate: '2025-11-06',
      status: 'Pending',
      reason: 'Medical appointment',
    },
  ]);

  const [departments] = useState<Department[]>([
    { name: 'Engineering', headCount: 45, budget: 5400000 },
    { name: 'Marketing', headCount: 12, budget: 1140000 },
    { name: 'Finance', headCount: 8, budget: 680000 },
    { name: 'HR', headCount: 5, budget: 425000 },
  ]);

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = 'Name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.department?.trim()) errors.department = 'Department is required';
    if (!formData.position?.trim()) errors.position = 'Position is required';
    if (!formData.salary || formData.salary <= 0) errors.salary = 'Valid salary is required';
    if (!formData.hireDate) errors.hireDate = 'Hire date is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Employee Management
  const handleAddEmployee = () => {
    if (!validateForm()) return;

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: formData.name!,
      email: formData.email!,
      department: formData.department!,
      position: formData.position!,
      salary: formData.salary!,
      hireDate: formData.hireDate!,
      status: 'Active',
    };

    setEmployees([...employees, newEmployee]);
    resetForm();
  };

  const handleUpdateEmployee = () => {
    if (!validateForm() || !editingEmployee) return;

    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
      )
    );
    resetForm();
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const startEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowAddEmployee(true);
  };

  const resetForm = () => {
    setFormData({});
    setFormErrors({});
    setShowAddEmployee(false);
    setEditingEmployee(null);
  };

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaveRequests(
      leaveRequests.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const pendingLeaveRequests = leaveRequests.filter((r) => r.status === 'Pending').length;
  const avgSalary = Math.round(
    employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length
  );

  // Tab Navigation
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'leave', label: 'Leave Requests', icon: Calendar },
    { id: 'departments', label: 'Departments', icon: Building2 },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-2">Human Resources</h1>
          <p className="text-gray-400">Manage employees, departments, and leave requests</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-800">
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Employees</p>
                    <p className="text-3xl font-bold">{totalEmployees}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-600/20 p-3 rounded-lg">
                    <Check className="text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Active</p>
                    <p className="text-3xl font-bold">{activeEmployees}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-600/20 p-3 rounded-lg">
                    <Calendar className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Pending Requests</p>
                    <p className="text-3xl font-bold">{pendingLeaveRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <TrendingUp className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Avg. Salary</p>
                    <p className="text-3xl font-bold">${(avgSalary / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Department Overview</h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Building2 className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium">{dept.name}</p>
                        <p className="text-sm text-gray-400">{dept.headCount} employees</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(dept.budget / 1000000).toFixed(2)}M</p>
                      <p className="text-sm text-gray-400">Budget</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Search and Add */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600"
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddEmployee(true);
                }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
              >
                <UserPlus size={20} />
                Add Employee
              </button>
            </div>

            {/* Add/Edit Employee Form */}
            {showAddEmployee && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-gray-800 border ${
                        formErrors.name ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-gray-800 border ${
                        formErrors.email ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <select
                      value={formData.department || ''}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full bg-gray-800 border ${
                        formErrors.department ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.name} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.department && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.department}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.position || ''}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`w-full bg-gray-800 border ${
                        formErrors.position ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    />
                    {formErrors.position && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.position}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Salary</label>
                    <input
                      type="number"
                      value={formData.salary || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })
                      }
                      className={`w-full bg-gray-800 border ${
                        formErrors.salary ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    />
                    {formErrors.salary && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.salary}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Hire Date</label>
                    <input
                      type="date"
                      value={formData.hireDate || ''}
                      onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                      className={`w-full bg-gray-800 border ${
                        formErrors.hireDate ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-600`}
                    />
                    {formErrors.hireDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {formErrors.hireDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    {editingEmployee ? 'Update' : 'Add'} Employee
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Employee List */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-400">Name</th>
                      <th className="text-left p-4 font-medium text-gray-400">Email</th>
                      <th className="text-left p-4 font-medium text-gray-400">Department</th>
                      <th className="text-left p-4 font-medium text-gray-400">Position</th>
                      <th className="text-left p-4 font-medium text-gray-400">Salary</th>
                      <th className="text-left p-4 font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center p-8 text-gray-400">
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                          <td className="p-4 font-medium">{employee.name}</td>
                          <td className="p-4 text-gray-400">{employee.email}</td>
                          <td className="p-4">{employee.department}</td>
                          <td className="p-4">{employee.position}</td>
                          <td className="p-4">${employee.salary.toLocaleString()}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                employee.status === 'Active'
                                  ? 'bg-green-600/20 text-green-400'
                                  : employee.status === 'On Leave'
                                  ? 'bg-orange-600/20 text-orange-400'
                                  : 'bg-gray-600/20 text-gray-400'
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEdit(employee)}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Edit2 size={16} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} className="text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Leave Requests Tab */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
              <div className="space-y-4">
                {leaveRequests.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No leave requests</p>
                ) : (
                  leaveRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{request.employeeName}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                request.status === 'Pending'
                                  ? 'bg-orange-600/20 text-orange-400'
                                  : request.status === 'Approved'
                                  ? 'bg-green-600/20 text-green-400'
                                  : 'bg-red-600/20 text-red-400'
                              }`}
                            >
                              {request.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-400">
                            <p>
                              <span className="font-medium text-white">Type:</span> {request.type}
                            </p>
                            <p>
                              <span className="font-medium text-white">Duration:</span>{' '}
                              {request.startDate} to {request.endDate}
                            </p>
                            <p>
                              <span className="font-medium text-white">Reason:</span> {request.reason}
                            </p>
                          </div>
                        </div>
                        {request.status === 'Pending' && (
                          <div className="flex gap-2 items-start">
                            <button
                              onClick={() => handleLeaveAction(request.id, 'Approved')}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                            >
                              <Check size={16} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleLeaveAction(request.id, 'Rejected')}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                            >
                              <X size={16} />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => {
                const deptEmployees = employees.filter((e) => e.department === dept.name);
                const avgDeptSalary =
                  deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length || 0;

                return (
                  <div
                    key={dept.name}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Building2 className="text-purple-400" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{dept.name}</h3>
                        <p className="text-gray-400 text-sm">Department</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                        <span className="text-gray-400">Employees</span>
                        <span className="font-semibold text-lg">{dept.headCount}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                        <span className="text-gray-400">Total Budget</span>
                        <span className="font-semibold text-lg">
                          ${(dept.budget / 1000000).toFixed(2)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                        <span className="text-gray-400">Avg. Salary</span>
                        <span className="font-semibold text-lg">
                          ${avgDeptSalary > 0 ? (avgDeptSalary / 1000).toFixed(0) : '0'}k
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Active Employees</span>
                        <span className="font-semibold text-lg">
                          {deptEmployees.filter((e) => e.status === 'Active').length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HR;
