export const user_permission = [
    { value: 'Dashboard', label: 'Dashboard' },
    { value: 'Property', label: 'Property' },
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
    { value: 'Building', label: 'Building' },
    { value: 'Reports', label: 'Reports' },
    { value: 'Balance Sheet', label: 'Balance Sheet' },
    // { value: 'User Role', label: 'User Role' },
    // { value: 'User Management', label: 'User Management' },
]

export const occupancy = [
    { value: 'true', label: 'Occupied' },
    { value: 'false', label: 'Vacant' }
]

export const rent_due_days = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
    { value: 16, label: '16' },
    { value: 17, label: '17' },
    { value: 18, label: '18' },
    { value: 19, label: '19' },
    { value: 20, label: '20' },
    { value: 21, label: '21' },
    { value: 22, label: '22' },
    { value: 23, label: '23' },
    { value: 24, label: '24' },
    { value: 25, label: '25' }
]

export const paid_status_list = [
    { value: 'true', label: 'Partial Paid' },
    { value: 'false', label: 'Fully Paid' }
]

export const payment_methods = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Debit Card', label: 'Debit Card' },
    { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' }
]

export const month_year = [
    { value: '', label: 'All' },
    { value: new Date().getMonth()+1, label: 'This Month' },
    { value: new Date().getFullYear(), label: 'This Year' }
]

export const building_type = [
    { value: 'multiple', label: 'Flat' },
    { value: 'single', label: 'House' }
]