
import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Icons (using simple text/emojis for prototyping, can be replaced with FontAwesome/LucideReact) ---
const Icon = ({ name, className = '' }) => {
    switch (name) {
        case 'dashboard': return <span className={`icon ${className}`}>📊</span>;
        case 'orders': return <span className={`icon ${className}`}>🧺</span>;
        case 'partners': return <span className={`icon ${className}`}>🤝</span>;
        case 'rates': return <span className={`icon ${className}`}>💰</span>;
        case 'reports': return <span className={`icon ${className}`}>📈</span>;
        case 'settings': return <span className={`icon ${className}`}>⚙️</span>;
        case 'back': return <span className={`icon ${className}`}>◀️</span>;
        case 'user': return <span className={`icon ${className}`}>👤</span>;
        case 'sun': return <span className={`icon ${className}`}>☀️</span>;
        case 'moon': return <span className={`icon ${className}`}>🌙</span>;
        case 'check': return <span className={`icon ${className}`}>✅</span>;
        case 'info': return <span className={`icon ${className}`}>ℹ️</span>;
        case 'warning': return <span className={`icon ${className}`}>⚠️</span>;
        case 'error': return <span className={`icon ${className}`}>❌</span>;
        case 'plus': return <span className={`icon ${className}`}>➕</span>;
        case 'edit': return <span className={`icon ${className}`}>✏️</span>;
        case 'clock': return <span className={`icon ${className}`}>⏰</span>;
        case 'delivery': return <span className={`icon ${className}`}>🚚</span>;
        case 'pickup': return <span className={`icon ${className}`}>🛍️</span>;
        case 'total-orders': return <span className={`icon ${className}`}>📦</span>;
        case 'revenue': return <span className={`icon ${className}`}>💵</span>;
        case 'turnaround': return <span className={`icon ${className}`}>⏱️</span>;
        case 'received': return <span className={`icon ${className}`}>📥</span>;
        case 'in-progress': return <span className={`icon ${className}`}>🔄</span>;
        case 'completed': return <span className={`icon ${className}`}>✅</span>;
        case 'schedule': return <span className={`icon ${className}`}>🗓️</span>;
        case 'accordion-arrow': return <span className={`icon ${className}`}>🔽</span>;
        default: return <span className={`icon ${className}`}>❓</span>;
    }
};

// --- Context for Notifications ---
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

const useNotifications = () => useContext(NotificationContext);

// --- Notification System Component ---
const NotificationSystem = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.type}`}>
                    <span className="notification-icon">
                        {notification.type === 'success' && <Icon name="check" />}
                        {notification.type === 'info' && <Icon name="info" />}
                        {notification.type === 'warning' && <Icon name="warning" />}
                        {notification.type === 'error' && <Icon name="error" />}
                    </span>
                    <div className="notification-content">
                        <p>{notification.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Dummy Data ---
const generateUUID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const DUMMY_DATA = {
    users: [
        { id: 'usr-001', name: 'Admin User', email: 'admin@ironeclipse.com', role: 'Admin' },
        { id: 'usr-002', name: 'Customer Alice', email: 'alice@example.com', role: 'Customer' },
        { id: 'usr-003', name: 'Service Bob', email: 'bob@partner.com', role: 'Service Provider' },
        { id: 'usr-004', name: 'Customer Carol', email: 'carol@example.com', role: 'Customer' },
        { id: 'usr-005', name: 'Service David', email: 'david@partner.com', role: 'Service Provider' },
    ],
    orders: [
        {
            id: 'ord-001', customerId: 'usr-002', customerName: 'Customer Alice',
            items: [{ type: 'Shirt', qty: 5, pricePer: 2.50 }, { type: 'Pants', qty: 2, pricePer: 4.00 }],
            totalPrice: 20.50,
            status: 'Delivered', createdDate: '2023-10-20T10:00:00Z', acceptedDate: '2023-10-20T11:00:00Z',
            ironingStartDate: '2023-10-20T14:00:00Z', readyDate: '2023-10-20T16:00:00Z', deliveredDate: '2023-10-20T18:00:00Z',
            deliveryOption: 'Doorstep', deliveryAddress: '123 Main St', serviceProviderId: 'usr-003', serviceProviderName: 'Service Bob',
            sla: { currentStage: 'Delivered', due: null, breached: false }
        },
        {
            id: 'ord-002', customerId: 'usr-002', customerName: 'Customer Alice',
            items: [{ type: 'Dress', qty: 1, pricePer: 8.00 }, { type: 'Shirt', qty: 3, pricePer: 2.50 }],
            totalPrice: 15.50,
            status: 'Ready', createdDate: '2023-10-22T09:30:00Z', acceptedDate: '2023-10-22T10:00:00Z',
            ironingStartDate: '2023-10-22T12:00:00Z', readyDate: '2023-10-22T14:00:00Z',
            deliveryOption: 'Customer Pickup', pickupLocation: 'Partner A Store', serviceProviderId: 'usr-003', serviceProviderName: 'Service Bob',
            sla: { currentStage: 'Ready', due: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), breached: false } // Due in 2 hours
        },
        {
            id: 'ord-003', customerId: 'usr-004', customerName: 'Customer Carol',
            items: [{ type: 'Towel', qty: 10, pricePer: 1.50 }],
            totalPrice: 15.00,
            status: 'Ironing', createdDate: '2023-10-23T11:00:00Z', acceptedDate: '2023-10-23T11:30:00Z',
            ironingStartDate: '2023-10-23T13:00:00Z',
            deliveryOption: 'Doorstep', deliveryAddress: '456 Oak Ave', serviceProviderId: 'usr-005', serviceProviderName: 'Service David',
            sla: { currentStage: 'Ironing', due: new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toISOString(), breached: true } // 1 hour breached
        },
        {
            id: 'ord-004', customerId: 'usr-004', customerName: 'Customer Carol',
            items: [{ type: 'Blouse', qty: 3, pricePer: 3.00 }, { type: 'Skirt', qty: 2, pricePer: 3.50 }],
            totalPrice: 16.00,
            status: 'Accepted', createdDate: '2023-10-24T08:00:00Z', acceptedDate: '2023-10-24T08:30:00Z',
            deliveryOption: 'Doorstep', deliveryAddress: '456 Oak Ave', serviceProviderId: 'usr-003', serviceProviderName: 'Service Bob',
            sla: { currentStage: 'Accepted', due: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(), breached: false } // Due in 4 hours
        },
        {
            id: 'ord-005', customerId: 'usr-002', customerName: 'Customer Alice',
            items: [{ type: 'Bed Sheet', qty: 2, pricePer: 6.00 }],
            totalPrice: 12.00,
            status: 'Created', createdDate: '2023-10-24T10:00:00Z',
            deliveryOption: 'Customer Pickup', pickupLocation: 'Partner B Hub', serviceProviderId: null, serviceProviderName: null,
            sla: { currentStage: 'Created', due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), breached: false } // Due in 24 hours
        },
        {
            id: 'ord-006', customerId: 'usr-004', customerName: 'Customer Carol',
            items: [{ type: 'Shirt', qty: 7, pricePer: 2.50 }],
            totalPrice: 17.50,
            status: 'Created', createdDate: '2023-10-24T12:00:00Z',
            deliveryOption: 'Doorstep', deliveryAddress: '456 Oak Ave', serviceProviderId: null, serviceProviderName: null,
            sla: { currentStage: 'Created', due: new Date(new Date().getTime() + 23 * 60 * 60 * 1000).toISOString(), breached: false } // Due in 23 hours
        },
        {
            id: 'ord-007', customerId: 'usr-002', customerName: 'Customer Alice',
            items: [{ type: 'Towel', qty: 3, pricePer: 1.50 }],
            totalPrice: 4.50,
            status: 'Delivered', createdDate: '2023-10-18T14:00:00Z', acceptedDate: '2023-10-18T14:30:00Z',
            ironingStartDate: '2023-10-18T16:00:00Z', readyDate: '2023-10-18T18:00:00Z', deliveredDate: '2023-10-18T20:00:00Z',
            deliveryOption: 'Doorstep', deliveryAddress: '123 Main St', serviceProviderId: 'usr-005', serviceProviderName: 'Service David',
            sla: { currentStage: 'Delivered', due: null, breached: false }
        },
        {
            id: 'ord-008', customerId: 'usr-004', customerName: 'Customer Carol',
            items: [{ type: 'Shirt', qty: 2, pricePer: 2.50 }],
            totalPrice: 5.00,
            status: 'Ready', createdDate: '2023-10-23T09:00:00Z', acceptedDate: '2023-10-23T09:30:00Z',
            ironingStartDate: '2023-10-23T11:00:00Z', readyDate: '2023-10-23T13:00:00Z',
            deliveryOption: 'Customer Pickup', pickupLocation: 'Partner A Store', serviceProviderId: 'usr-003', serviceProviderName: 'Service Bob',
            sla: { currentStage: 'Ready', due: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(), breached: false } // Due in 1 hour
        },
    ],
    partners: [
        { id: 'ptr-001', name: 'Service Bob', email: 'bob@partner.com', contact: '555-0001', address: '101 Partner St', status: 'Active', userId: 'usr-003' },
        { id: 'ptr-002', name: 'Service David', email: 'david@partner.com', contact: '555-0002', address: '202 Partner Ave', status: 'Active', userId: 'usr-005' },
        { id: 'ptr-003', name: 'Service Emily', email: 'emily@partner.com', contact: '555-0003', address: '303 Partner Blvd', status: 'Pending Approval', userId: null },
        { id: 'ptr-004', name: 'Service Frank', email: 'frank@partner.com', contact: '555-0004', address: '404 Partner Rd', status: 'Deactivated', userId: null },
    ],
    rates: [
        { id: 'rate-001', clothType: 'Shirt', price: 2.50, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-002', clothType: 'Pants', price: 4.00, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-003', clothType: 'Dress', price: 8.00, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-004', clothType: 'Towel', price: 1.50, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-005', clothType: 'Blouse', price: 3.00, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-006', clothType: 'Skirt', price: 3.50, unit: 'per piece', lastUpdated: '2023-10-01' },
        { id: 'rate-007', clothType: 'Bed Sheet', price: 6.00, unit: 'per piece', lastUpdated: '2023-10-01' },
    ],
    auditLogs: [
        { id: 'log-001', timestamp: '2023-10-24T12:05:00Z', user: 'Admin User', action: 'Rate Updated', details: 'Shirt price changed from 2.00 to 2.50', entityId: 'rate-001' },
        { id: 'log-002', timestamp: '2023-10-24T10:00:30Z', user: 'Customer Alice', action: 'Order Placed', details: 'Order ord-005 created', entityId: 'ord-005' },
        { id: 'log-003', timestamp: '2023-10-23T13:00:00Z', user: 'Service David', action: 'Order Status Changed', details: 'Order ord-003 changed from Accepted to Ironing', entityId: 'ord-003' },
        { id: 'log-004', timestamp: '2023-10-22T14:00:00Z', user: 'Service Bob', action: 'Order Status Changed', details: 'Order ord-002 changed from Ironing to Ready', entityId: 'ord-002' },
    ]
};

// --- Helper Functions ---
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleString() : 'N/A';
const getStatusColorClass = (status) => `card-status-${status.replace(/\s/g, '')}`;

// --- Reusable Components ---

const Accordion = ({ title, children, isOpen, onToggle }) => (
    <div className="accordion-panel">
        <div className={`accordion-header ${isOpen ? 'expanded' : ''}`} onClick={onToggle}>
            {title}
            <Icon name="accordion-arrow" className={isOpen ? 'icon-rotate-180' : ''} />
        </div>
        <div className={`accordion-content ${isOpen ? 'expanded' : ''}`}>
            {children}
        </div>
    </div>
);

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => (
    <button type={type} onClick={onClick} className={`button button-${variant} ${className}`}>
        {children}
    </button>
);

const KPICard = ({ value, label, icon, status = 'neutral', trend = null, onClick }) => (
    <div className={`kpi-card ${getStatusColorClass(status)}`} onClick={onClick}>
        <div className="card-header-accent">{label}</div>
        <div className="kpi-card-content card-content">
            {icon && <Icon name={icon} className="kpi-card-icon" />}
            <div className="kpi-card-value">{value}</div>
            <div className="kpi-card-label">{label}</div>
            {trend && (
                <div className={`kpi-card-status ${trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral'}`}>
                    {trend > 0 ? '▲' : trend < 0 ? '▼' : '▬'} {Math.abs(trend)}%
                </div>
            )}
        </div>
    </div>
);

const ActionCard = ({ title, meta, status, onClick, children, accentType, actions }) => (
    <div className={`card ${getStatusColorClass(status)}`} onClick={onClick} tabIndex="0" role="button">
        <div className={`card-header-accent ${getStatusColorClass(status)}`}>
            <span>{accentType}</span>
            <span className="status-badge" style={{ backgroundColor: `var(--status-${status.replace(/\s/g, '')}-dark)` }}>{status}</span>
        </div>
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            {meta && <p className="card-meta">{meta}</p>}
            {children}
        </div>
        {actions && actions.length > 0 && (
            <div className="card-actions">
                {actions.map((action, index) => (
                    <Button key={index} onClick={action.onClick} variant="secondary">{action.label}</Button>
                ))}
            </div>
        )}
    </div>
);

const WorkflowStepper = ({ stages, currentStage, slaBreachedStages = [] }) => {
    const stageOrder = ['Created', 'Accepted', 'Ironing', 'Ready', 'Delivered', 'Picked'];
    const currentStageIndex = stageOrder.indexOf(currentStage);

    return (
        <div className="workflow-stepper">
            <h3>Workflow Progress</h3>
            {stageOrder.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isActive = stage === currentStage;
                const isSLABreached = slaBreachedStages.includes(stage);

                // Find the actual stage object to get date/time
                const stageData = stages.find(s => s.name === stage) || {};

                return (
                    <div
                        key={stage}
                        className={`stepper-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isSLABreached ? 'sla-breach' : ''}`}
                    >
                        <span className="step-icon">
                            {isCompleted ? <Icon name="check" /> : index + 1}
                        </span>
                        <div className="step-content">
                            <h4>
                                {stage}
                                {isSLABreached && <span className="sla-badge">SLA BREACHED</span>}
                            </h4>
                            <p className="step-meta">
                                {stageData.date ? `Completed on ${formatDate(stageData.date)}` : isActive ? 'Currently active' : 'Pending'}
                            </p>
                            {stageData.details && <p className="step-meta">{stageData.details}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- Form Components ---
const CustomerRegistrationForm = ({ onSubmit, onCancel, currentUserId }) => {
    const { addNotification } = useNotifications();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [activeAccordion, setActiveAccordion] = useState('Personal Info');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
        if (!formData.password) newErrors.password = 'Password is required.';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addNotification('Customer registered successfully!', 'success');
            onSubmit(formData);
        } else {
            addNotification('Please correct the form errors.', 'error');
        }
    };

    return (
        <div className="form-container">
            <h2 className="mb-xl">New Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <Accordion title="Personal Info" isOpen={activeAccordion === 'Personal Info'} onToggle={() => setActiveAccordion(activeAccordion === 'Personal Info' ? '' : 'Personal Info')}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                </Accordion>
                <Accordion title="Account Security" isOpen={activeAccordion === 'Account Security'} onToggle={() => setActiveAccordion(activeAccordion === 'Account Security' ? '' : 'Account Security')}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>
                </Accordion>
                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">Register Customer</Button>
                </div>
            </form>
        </div>
    );
};

const OrderForm = ({ order = {}, onSubmit, onCancel, customerId, customerName, partners, rates }) => {
    const { addNotification } = useNotifications();
    const isNew = !order.id;
    const [formData, setFormData] = useState({
        ...order,
        customerId: customerId || order.customerId || '',
        customerName: customerName || order.customerName || '',
        items: order.items && order.items.length > 0 ? order.items : [{ type: '', qty: 1, pricePer: 0 }],
        deliveryOption: order.deliveryOption || 'Doorstep',
        deliveryAddress: order.deliveryOption === 'Doorstep' ? order.deliveryAddress || '' : '',
        pickupLocation: order.deliveryOption === 'Customer Pickup' ? order.pickupLocation || '' : '',
        serviceProviderId: order.serviceProviderId || '',
        status: order.status || 'Created',
    });
    const [errors, setErrors] = useState({});
    const [activeAccordion, setActiveAccordion] = useState('Order Details');

    useEffect(() => {
        // Auto-calculate total price based on items and rates
        const newItems = formData.items.map(item => {
            const selectedRate = rates.find(r => r.clothType === item.type);
            return {
                ...item,
                pricePer: selectedRate ? selectedRate.price : 0,
            };
        });
        const newTotalPrice = newItems.reduce((sum, item) => sum + (item.qty * item.pricePer), 0);
        setFormData(prev => ({ ...prev, items: newItems, totalPrice: newTotalPrice }));
    }, [formData.items.map(item => `${item.type}-${item.qty}`).join(','), rates]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, e) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [e.target.name]: e.target.value };
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { type: '', qty: 1, pricePer: 0 }] });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.customerName) newErrors.customerName = 'Customer is required.';
        if (formData.items.length === 0 || formData.items.some(item => !item.type || item.qty <= 0)) {
            newErrors.items = 'At least one item with valid type and quantity is required.';
        }
        if (formData.deliveryOption === 'Doorstep' && !formData.deliveryAddress) {
            newErrors.deliveryAddress = 'Delivery address is required for doorstep delivery.';
        }
        if (formData.deliveryOption === 'Customer Pickup' && !formData.pickupLocation) {
            newErrors.pickupLocation = 'Pickup location is required for customer pickup.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addNotification(`Order ${isNew ? 'created' : 'updated'} successfully!`, 'success');
            onSubmit(formData);
        } else {
            addNotification('Please correct the form errors.', 'error');
        }
    };

    const availableClothTypes = rates.map(rate => rate.clothType);

    return (
        <div className="form-container">
            <h2 className="mb-xl">{isNew ? 'Create New Order' : `Edit Order ${order.id}`}</h2>
            <form onSubmit={handleSubmit}>
                <Accordion title="Order Details" isOpen={activeAccordion === 'Order Details'} onToggle={() => setActiveAccordion(activeAccordion === 'Order Details' ? '' : 'Order Details')}>
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name</label>
                        <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} readOnly={!isNew} required />
                        {errors.customerName && <p className="error-message">{errors.customerName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Items</label>
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex gap-md mb-md items-center">
                                <select name="type" value={item.type} onChange={(e) => handleItemChange(index, e)} required className="flex-grow">
                                    <option value="">Select Item Type</option>
                                    {availableClothTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                                <input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, e)} min="1" required style={{ width: '80px' }} />
                                <span style={{ width: '80px', textAlign: 'right' }}>{formatCurrency(item.qty * item.pricePer)}</span>
                                <Button type="button" variant="secondary" onClick={() => removeItem(index)}><Icon name="error" /></Button>
                            </div>
                        ))}
                        {errors.items && <p className="error-message">{errors.items}</p>}
                        <Button type="button" variant="secondary" onClick={addItem} className="mb-md"><Icon name="plus" /> Add Item</Button>
                    </div>
                    <div className="form-group">
                        <label>Total Price</label>
                        <input type="text" value={formatCurrency(formData.totalPrice)} readOnly />
                    </div>
                </Accordion>

                <Accordion title="Delivery Options" isOpen={activeAccordion === 'Delivery Options'} onToggle={() => setActiveAccordion(activeAccordion === 'Delivery Options' ? '' : 'Delivery Options')}>
                    <div className="form-group">
                        <label htmlFor="deliveryOption">Delivery Option</label>
                        <select id="deliveryOption" name="deliveryOption" value={formData.deliveryOption} onChange={handleChange} required>
                            <option value="Doorstep">Doorstep Delivery</option>
                            <option value="Customer Pickup">Customer Pickup</option>
                        </select>
                    </div>
                    {formData.deliveryOption === 'Doorstep' && (
                        <div className="form-group">
                            <label htmlFor="deliveryAddress">Delivery Address</label>
                            <input type="text" id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required={formData.deliveryOption === 'Doorstep'} />
                            {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress}</p>}
                        </div>
                    )}
                    {formData.deliveryOption === 'Customer Pickup' && (
                        <div className="form-group">
                            <label htmlFor="pickupLocation">Pickup Location</label>
                            <input type="text" id="pickupLocation" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required={formData.deliveryOption === 'Customer Pickup'} />
                            {errors.pickupLocation && <p className="error-message">{errors.pickupLocation}</p>}
                        </div>
                    )}
                </Accordion>
                {['Admin', 'Service Provider'].includes(localStorage.getItem('userRole')) && (
                    <Accordion title="Service Assignment & Status" isOpen={activeAccordion === 'Service Assignment & Status'} onToggle={() => setActiveAccordion(activeAccordion === 'Service Assignment & Status' ? '' : 'Service Assignment & Status')}>
                        <div className="form-group">
                            <label htmlFor="serviceProviderId">Assign Service Provider</label>
                            <select id="serviceProviderId" name="serviceProviderId" value={formData.serviceProviderId} onChange={handleChange}>
                                <option value="">Unassigned</option>
                                {partners.filter(p => p.status === 'Active').map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Order Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange}>
                                <option value="Created">Created</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Ironing">Ironing</option>
                                <option value="Ready">Ready</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Picked">Customer Picked Up</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </Accordion>
                )}
                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">{isNew ? 'Place Order' : 'Update Order'}</Button>
                </div>
            </form>
        </div>
    );
};

const PartnerForm = ({ partner = {}, onSubmit, onCancel }) => {
    const { addNotification } = useNotifications();
    const isNew = !partner.id;
    const [formData, setFormData] = useState({
        ...partner,
        name: partner.name || '',
        email: partner.email || '',
        contact: partner.contact || '',
        address: partner.address || '',
        status: partner.status || 'Pending Approval',
    });
    const [errors, setErrors] = useState({});
    const [activeAccordion, setActiveAccordion] = useState('Partner Details');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Partner Name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
        if (!formData.contact) newErrors.contact = 'Contact is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addNotification(`Partner ${isNew ? 'added' : 'updated'} successfully!`, 'success');
            onSubmit(formData);
        } else {
            addNotification('Please correct the form errors.', 'error');
        }
    };

    return (
        <div className="form-container">
            <h2 className="mb-xl">{isNew ? 'Add New Partner' : `Edit Partner ${partner.name}`}</h2>
            <form onSubmit={handleSubmit}>
                <Accordion title="Partner Details" isOpen={activeAccordion === 'Partner Details'} onToggle={() => setActiveAccordion(activeAccordion === 'Partner Details' ? '' : 'Partner Details')}>
                    <div className="form-group">
                        <label htmlFor="name">Partner Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
                        {errors.contact && <p className="error-message">{errors.contact}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea>
                        {errors.address && <p className="error-message">{errors.address}</p>}
                    </div>
                </Accordion>
                <Accordion title="Status & Approval" isOpen={activeAccordion === 'Status & Approval'} onToggle={() => setActiveAccordion(activeAccordion === 'Status & Approval' ? '' : 'Status & Approval')}>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Active">Active</option>
                            <option value="Deactivated">Deactivated</option>
                        </select>
                    </div>
                </Accordion>
                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">{isNew ? 'Add Partner' : 'Update Partner'}</Button>
                </div>
            </form>
        </div>
    );
};

const RateForm = ({ rate = {}, onSubmit, onCancel }) => {
    const { addNotification } = useNotifications();
    const isNew = !rate.id;
    const [formData, setFormData] = useState({
        ...rate,
        clothType: rate.clothType || '',
        price: rate.price || 0,
        unit: rate.unit || 'per piece',
    });
    const [errors, setErrors] = useState({});
    const [activeAccordion, setActiveAccordion] = useState('Rate Details');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.clothType) newErrors.clothType = 'Cloth type is required.';
        if (formData.price <= 0) newErrors.price = 'Price must be greater than zero.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addNotification(`Rate ${isNew ? 'added' : 'updated'} successfully!`, 'success');
            onSubmit(formData);
        } else {
            addNotification('Please correct the form errors.', 'error');
        }
    };

    return (
        <div className="form-container">
            <h2 className="mb-xl">{isNew ? 'Add New Rate' : `Edit Rate for ${rate.clothType}`}</h2>
            <form onSubmit={handleSubmit}>
                <Accordion title="Rate Details" isOpen={activeAccordion === 'Rate Details'} onToggle={() => setActiveAccordion(activeAccordion === 'Rate Details' ? '' : 'Rate Details')}>
                    <div className="form-group">
                        <label htmlFor="clothType">Cloth Type</label>
                        <input type="text" id="clothType" name="clothType" value={formData.clothType} onChange={handleChange} required={isNew} readOnly={!isNew} />
                        {errors.clothType && <p className="error-message">{errors.clothType}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0.01" step="0.01" required />
                        {errors.price && <p className="error-message">{errors.price}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Unit</label>
                        <select id="unit" name="unit" value={formData.unit} onChange={handleChange} required>
                            <option value="per piece">Per Piece</option>
                            <option value="per kg">Per KG</option>
                        </select>
                    </div>
                </Accordion>
                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">{isNew ? 'Add Rate' : 'Update Rate'}</Button>
                </div>
            </form>
        </div>
    );
};

// --- Dashboards ---
const AdminDashboard = ({ orders, partners, handleCardClick }) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.filter(o => ['Delivered', 'Picked'].includes(o.status)).reduce((sum, order) => sum + order.totalPrice, 0);
    const completedOrders = orders.filter(o => ['Delivered', 'Picked'].includes(o.status));
    const avgTurnaroundTime = completedOrders.length > 0
        ? completedOrders.reduce((sum, order) => {
            const created = new Date(order.createdDate).getTime();
            const delivered = new Date(order.deliveredDate || order.readyDate).getTime();
            return sum + (delivered - created);
        }, 0) / completedOrders.length / (1000 * 60 * 60) // in hours
        : 0;
    const deliveryCount = orders.filter(o => o.deliveryOption === 'Doorstep').length;
    const pickupCount = orders.filter(o => o.deliveryOption === 'Customer Pickup').length;

    const recentActivities = DUMMY_DATA.auditLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

    return (
        <div className="dashboard-container">
            <h2 className="mb-xl">Admin Dashboard</h2>
            <div className="dashboard-grid mb-xl">
                <KPICard value={totalOrders} label="Total Orders" icon="total-orders" onClick={() => handleCardClick('OrdersList')} />
                <KPICard value={formatCurrency(totalRevenue)} label="Total Revenue" icon="revenue" status="green" onClick={() => handleCardClick('OrdersList')} />
                <KPICard value={`${avgTurnaroundTime.toFixed(1)} hrs`} label="Avg Turnaround Time" icon="turnaround" status={avgTurnaroundTime > 24 ? 'red' : 'blue'} onClick={() => handleCardClick('OrdersList')} />
                <KPICard value={`${deliveryCount} / ${pickupCount}`} label="Delivery vs Pickup" icon="delivery" onClick={() => handleCardClick('OrdersList')} />
            </div>

            <div className="dashboard-grid">
                <div className="chart-card">
                    <h3>Revenue Trend (Monthly)</h3>
                    <div className="chart-placeholder">Animated Chart Placeholder</div>
                </div>
                <div className="chart-card">
                    <h3>Delivery vs Pickup Distribution</h3>
                    <div className="chart-placeholder">Animated Pie Chart Placeholder</div>
                </div>
            </div>

            <div className="flex gap-lg mb-xl mt-xl flex-col md:flex-row">
                <div className="panel-card flex-grow">
                    <h3>Recent Activities</h3>
                    <ul className="activity-list">
                        {recentActivities.map(activity => (
                            <li key={activity.id} className="activity-item">
                                <Icon name="info" className="activity-icon" />
                                <div className="activity-details">
                                    <p><strong>{activity.user}</strong> {activity.action}: {activity.details}</p>
                                    <span className="activity-timestamp">{formatDate(activity.timestamp)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const CustomerDashboard = ({ orders, handleCardClick, currentUser }) => {
    const customerOrders = orders.filter(order => order.customerId === currentUser.id);
    const ordersPlaced = customerOrders.length;
    const ordersReady = customerOrders.filter(order => order.status === 'Ready' || order.status === 'Delivered' || order.status === 'Picked').length;

    const recentActivities = DUMMY_DATA.auditLogs
        .filter(log => log.user.includes(currentUser.name) || customerOrders.some(o => o.id === log.entityId))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    const upcomingOrders = customerOrders.filter(o => !['Delivered', 'Picked', 'Cancelled'].includes(o.status))
                                         .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
                                         .slice(0, 3);

    return (
        <div className="dashboard-container">
            <h2 className="mb-xl">Welcome, {currentUser.name}!</h2>
            <div className="dashboard-grid mb-xl">
                <KPICard value={ordersPlaced} label="Orders Placed" icon="orders" onClick={() => handleCardClick('OrdersList')} />
                <KPICard value={ordersReady} label="Orders Ready" icon="check" status="green" onClick={() => handleCardClick('OrdersList', 'Ready')} />
            </div>

            <div className="dashboard-grid">
                <div className="chart-card">
                    <h3>My Order Status</h3>
                    <div className="chart-placeholder">Animated Bar Chart of My Orders by Status</div>
                </div>
                <div className="panel-card">
                    <h3>Upcoming Orders</h3>
                    <ul className="task-list">
                        {upcomingOrders.length > 0 ? (
                            upcomingOrders.map(order => (
                                <li key={order.id} className="task-item">
                                    <Icon name="clock" className="task-priority" />
                                    <div className="task-details">
                                        <p>Order #{order.id}: {order.status}</p>
                                        <span className="task-duedate">Delivery Option: {order.deliveryOption}</span>
                                    </div>
                                    <div className="task-item-actions">
                                        <Button variant="secondary" onClick={() => handleCardClick('OrderDetail', order)}>View</Button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No upcoming orders. <Button variant="primary" onClick={() => handleCardClick('NewOrderForm')}><Icon name="plus" /> Place New Order</Button></p>
                        )}
                    </ul>
                </div>
            </div>
            <div className="flex gap-lg mb-xl mt-xl flex-col md:flex-row">
                <div className="panel-card flex-grow">
                    <h3>Recent Activities</h3>
                    <ul className="activity-list">
                        {recentActivities.map(activity => (
                            <li key={activity.id} className="activity-item">
                                <Icon name="info" className="activity-icon" />
                                <div className="activity-details">
                                    <p>{activity.details}</p>
                                    <span className="activity-timestamp">{formatDate(activity.timestamp)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ServiceProviderDashboard = ({ orders, currentUser, handleCardClick }) => {
    const serviceProviderOrders = orders.filter(order => order.serviceProviderId === currentUser.id);
    const ordersReceived = serviceProviderOrders.filter(order => order.status === 'Accepted').length;
    const ordersInProgress = serviceProviderOrders.filter(order => order.status === 'Ironing').length;
    const ordersCompleted = serviceProviderOrders.filter(order => ['Delivered', 'Picked'].includes(order.status)).length;
    const deliveriesScheduled = serviceProviderOrders.filter(order => order.deliveryOption === 'Doorstep' && (order.status === 'Ready' || order.status === 'Ironing')).length;

    const tasks = serviceProviderOrders.filter(o => ['Accepted', 'Ironing', 'Ready'].includes(o.status))
                                       .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
                                       .slice(0, 5);

    const recentActivities = DUMMY_DATA.auditLogs
        .filter(log => log.user.includes(currentUser.name) || serviceProviderOrders.some(o => o.id === log.entityId))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    return (
        <div className="dashboard-container">
            <h2 className="mb-xl">Service Provider Dashboard</h2>
            <div className="dashboard-grid mb-xl">
                <KPICard value={ordersReceived} label="Orders Accepted" icon="received" onClick={() => handleCardClick('OrdersQueue')} />
                <KPICard value={ordersInProgress} label="Orders In Progress" icon="in-progress" status="blue" onClick={() => handleCardClick('OrdersQueue')} />
                <KPICard value={ordersCompleted} label="Orders Completed" icon="completed" status="green" onClick={() => handleCardClick('OrdersQueue')} />
                <KPICard value={deliveriesScheduled} label="Deliveries Scheduled" icon="schedule" status="orange" onClick={() => handleCardClick('OrdersQueue')} />
            </div>

            <div className="dashboard-grid">
                <div className="chart-card">
                    <h3>Orders by Status</h3>
                    <div className="chart-placeholder">Animated Pie Chart of Orders by Status</div>
                </div>
                <div className="chart-card">
                    <h3>Daily Volume Trend</h3>
                    <div className="chart-placeholder">Animated Line Chart of Daily Volume</div>
                </div>
            </div>

            <div className="flex gap-lg mb-xl mt-xl flex-col md:flex-row">
                <div className="panel-card flex-grow">
                    <h3>My Task Queue</h3>
                    <ul className="task-list">
                        {tasks.length > 0 ? (
                            tasks.map(order => (
                                <li key={order.id} className="task-item">
                                    <Icon name="clock" className="task-priority" />
                                    <div className="task-details">
                                        <p>Order #{order.id} ({order.customerName}): <strong>{order.status}</strong></p>
                                        <span className="task-duedate">Due: {order.sla?.due ? formatDate(order.sla.due) : 'N/A'} {order.sla?.breached && '(SLA Breached)'}</span>
                                    </div>
                                    <div className="task-item-actions">
                                        <Button variant="secondary" onClick={() => handleCardClick('OrderDetail', order)}>View</Button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No pending tasks.</p>
                        )}
                    </ul>
                </div>
                <div className="panel-card flex-grow">
                    <h3>Recent Activities</h3>
                    <ul className="activity-list">
                        {recentActivities.map(activity => (
                            <li key={activity.id} className="activity-item">
                                <Icon name="info" className="activity-icon" />
                                <div className="activity-details">
                                    <p>{activity.details}</p>
                                    <span className="activity-timestamp">{formatDate(activity.timestamp)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Full-Screen Detail / Form Views ---
const OrderDetailScreen = ({ order, goBack, updateOrder, deleteOrder, currentUserId, currentUserRole }) => {
    const { addNotification } = useNotifications();
    if (!order) return <p className="text-center">Order not found.</p>;

    const workflowStages = [
        { name: 'Created', date: order.createdDate, details: `Order placed by ${order.customerName}` },
        { name: 'Accepted', date: order.acceptedDate, details: `Accepted by ${order.serviceProviderName || 'N/A'}` },
        { name: 'Ironing', date: order.ironingStartDate, details: 'Processing in progress' },
        { name: 'Ready', date: order.readyDate, details: 'Ready for pickup/delivery' },
        { name: 'Delivered', date: order.deliveredDate, details: 'Order delivered to customer' },
        { name: 'Picked', date: order.pickedDate, details: 'Order picked up by customer' },
    ].filter(stage => stage.date || (order.status === stage.name)); // Show stage if date exists or it's the current status

    const canAccept = currentUserRole === 'Service Provider' && order.status === 'Created';
    const canMarkIroning = currentUserRole === 'Service Provider' && order.status === 'Accepted';
    const canMarkReady = currentUserRole === 'Service Provider' && order.status === 'Ironing';
    const canMarkDelivered = currentUserRole === 'Service Provider' && order.status === 'Ready' && order.deliveryOption === 'Doorstep';
    const canMarkPicked = currentUserRole === 'Service Provider' && order.status === 'Ready' && order.deliveryOption === 'Customer Pickup';
    const canEdit = ['Admin', 'Service Provider'].includes(currentUserRole);

    const handleAction = (actionType) => {
        let newStatus = order.status;
        let updateData = {};
        const now = new Date().toISOString();

        switch (actionType) {
            case 'accept':
                newStatus = 'Accepted';
                updateData = { acceptedDate: now, serviceProviderId: currentUserId, serviceProviderName: DUMMY_DATA.users.find(u => u.id === currentUserId)?.name };
                addNotification(`Order ${order.id} accepted.`, 'success');
                break;
            case 'startIroning':
                newStatus = 'Ironing';
                updateData = { ironingStartDate: now };
                addNotification(`Order ${order.id} started ironing.`, 'info');
                break;
            case 'markReady':
                newStatus = 'Ready';
                updateData = { readyDate: now };
                addNotification(`Order ${order.id} is ready.`, 'info');
                break;
            case 'markDelivered':
                newStatus = 'Delivered';
                updateData = { deliveredDate: now };
                addNotification(`Order ${order.id} delivered.`, 'success');
                break;
            case 'markPicked':
                newStatus = 'Picked';
                updateData = { pickedDate: now };
                addNotification(`Order ${order.id} picked up.`, 'success');
                break;
            default: return;
        }

        updateOrder({ ...order, status: newStatus, ...updateData });
        goBack(); // Return to list after action
    };

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={goBack} className="back-button"><Icon name="back" /> Back to Orders</Button>
                <h2>Order #{order.id}</h2>
                {canEdit && <Button variant="primary" onClick={() => handleCardClick('EditOrderForm', order)}><Icon name="edit" /> Edit Order</Button>}
            </div>

            <p className="breadcrumb">Orders &gt; Detail #{order.id}</p>

            <div className="detail-summary-card">
                <div className="detail-summary-grid mb-xl">
                    <div className="detail-item">
                        <label>Customer</label>
                        <p>{order.customerName}</p>
                    </div>
                    <div className="detail-item">
                        <label>Status</label>
                        <p><span className={`status-badge ${getStatusColorClass(order.status)}`}>{order.status}</span></p>
                    </div>
                    <div className="detail-item">
                        <label>Total Price</label>
                        <p>{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <div className="detail-item">
                        <label>Delivery Option</label>
                        <p>
                            {order.deliveryOption === 'Doorstep' ? <Icon name="delivery" /> : <Icon name="pickup" />}
                            {order.deliveryOption}
                        </p>
                    </div>
                    {order.deliveryOption === 'Doorstep' && (
                        <div className="detail-item">
                            <label>Delivery Address</label>
                            <p>{order.deliveryAddress}</p>
                        </div>
                    )}
                    {order.deliveryOption === 'Customer Pickup' && (
                        <div className="detail-item">
                            <label>Pickup Location</label>
                            <p>{order.pickupLocation}</p>
                        </div>
                    )}
                    <div className="detail-item">
                        <label>Service Provider</label>
                        <p>{order.serviceProviderName || 'Unassigned'}</p>
                    </div>
                    <div className="detail-item">
                        <label>Created Date</label>
                        <p>{formatDate(order.createdDate)}</p>
                    </div>
                    {order.sla?.breached && (
                        <div className="detail-item" style={{ backgroundColor: 'var(--status-red-light)' }}>
                            <label style={{ color: 'var(--status-red)' }}>SLA Status</label>
                            <p style={{ color: 'var(--status-red)', fontWeight: 'bold' }}>BREACHED! Due: {formatDate(order.sla.due)}</p>
                        </div>
                    )}
                </div>

                <h3 className="mb-md">Order Items</h3>
                <div className="card-grid mb-xl">
                    {order.items.map((item, index) => (
                        <ActionCard
                            key={index}
                            title={`${item.qty}x ${item.type}`}
                            meta={`Price: ${formatCurrency(item.pricePer)}/item`}
                            status={order.status}
                            accentType="Item"
                            onClick={() => addNotification(`Item ${item.type} details not implemented as full screen yet.`, 'info')}
                        >
                            <p>Total for item: {formatCurrency(item.qty * item.pricePer)}</p>
                        </ActionCard>
                    ))}
                </div>

                <WorkflowStepper stages={workflowStages} currentStage={order.status} slaBreachedStages={order.sla?.breached ? [order.sla.currentStage] : []} />

                <div className="detail-actions">
                    {canAccept && <Button variant="primary" onClick={() => handleAction('accept')}>Accept Order</Button>}
                    {canMarkIroning && <Button variant="primary" onClick={() => handleAction('startIroning')}>Start Ironing</Button>}
                    {canMarkReady && <Button variant="primary" onClick={() => handleAction('markReady')}>Mark as Ready</Button>}
                    {canMarkDelivered && <Button variant="primary" onClick={() => handleAction('markDelivered')}>Mark as Delivered</Button>}
                    {canMarkPicked && <Button variant="primary" onClick={() => handleAction('markPicked')}>Mark as Picked Up</Button>}
                </div>
            </div>
        </div>
    );
};

const PartnerDetailScreen = ({ partner, goBack, updatePartner }) => {
    const { addNotification } = useNotifications();
    if (!partner) return <p className="text-center">Partner not found.</p>;

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={goBack} className="back-button"><Icon name="back" /> Back to Partners</Button>
                <h2>Partner: {partner.name}</h2>
                <Button variant="primary" onClick={() => addNotification('Edit form for partner not implemented yet.', 'info')}><Icon name="edit" /> Edit Partner</Button>
            </div>

            <p className="breadcrumb">Partners &gt; Detail: {partner.name}</p>

            <div className="detail-summary-card">
                <div className="detail-summary-grid mb-xl">
                    <div className="detail-item">
                        <label>Name</label>
                        <p>{partner.name}</p>
                    </div>
                    <div className="detail-item">
                        <label>Status</label>
                        <p><span className={`status-badge ${getStatusColorClass(partner.status)}`}>{partner.status}</span></p>
                    </div>
                    <div className="detail-item">
                        <label>Email</label>
                        <p>{partner.email}</p>
                    </div>
                    <div className="detail-item">
                        <label>Contact</label>
                        <p>{partner.contact}</p>
                    </div>
                    <div className="detail-item">
                        <label>Address</label>
                        <p>{partner.address}</p>
                    </div>
                    {partner.userId && (
                        <div className="detail-item">
                            <label>Associated User ID</label>
                            <p>{partner.userId}</p>
                        </div>
                    )}
                </div>

                <h3 className="mb-md">Associated Orders (Sample)</h3>
                <div className="card-grid mb-xl">
                    {DUMMY_DATA.orders.filter(o => o.serviceProviderId === partner.userId).slice(0, 3).map(order => (
                        <ActionCard
                            key={order.id}
                            title={`Order #${order.id}`}
                            meta={`Customer: ${order.customerName}`}
                            status={order.status}
                            accentType="Order"
                            onClick={() => addNotification(`Order ${order.id} details not implemented as full screen yet.`, 'info')}
                        >
                            <p>Total: {formatCurrency(order.totalPrice)}</p>
                        </ActionCard>
                    ))}
                    {DUMMY_DATA.orders.filter(o => o.serviceProviderId === partner.userId).length === 0 && <p>No orders associated yet.</p>}
                </div>

                <div className="detail-actions">
                    <Button variant="danger" onClick={() => addNotification('Partner deactivation / deletion not implemented.', 'error')}>Deactivate Partner</Button>
                </div>
            </div>
        </div>
    );
};

const RateDetailScreen = ({ rate, goBack, updateRate }) => {
    const { addNotification } = useNotifications();
    if (!rate) return <p className="text-center">Rate not found.</p>;

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={goBack} className="back-button"><Icon name="back" /> Back to Rates</Button>
                <h2>Rate: {rate.clothType}</h2>
                <Button variant="primary" onClick={() => addNotification('Edit form for rate not implemented yet.', 'info')}><Icon name="edit" /> Edit Rate</Button>
            </div>

            <p className="breadcrumb">Rates &gt; Detail: {rate.clothType}</p>

            <div className="detail-summary-card">
                <div className="detail-summary-grid mb-xl">
                    <div className="detail-item">
                        <label>Cloth Type</label>
                        <p>{rate.clothType}</p>
                    </div>
                    <div className="detail-item">
                        <label>Price</label>
                        <p>{formatCurrency(rate.price)}</p>
                    </div>
                    <div className="detail-item">
                        <label>Unit</label>
                        <p>{rate.unit}</p>
                    </div>
                    <div className="detail-item">
                        <label>Last Updated</label>
                        <p>{rate.lastUpdated}</p>
                    </div>
                </div>

                <h3 className="mb-md">Related Pricing Rules (Sample)</h3>
                <div className="card-grid mb-xl">
                    <ActionCard
                        title="Bulk Discount Rule"
                        meta="10% off for 10+ pieces"
                        status="Active"
                        accentType="Rule"
                        onClick={() => addNotification('Pricing rule details not implemented.', 'info')}
                    >
                        <p>Applies to shirts and pants.</p>
                    </ActionCard>
                    <ActionCard
                        title="Express Service Surcharge"
                        meta="20% additional charge"
                        status="Active"
                        accentType="Rule"
                        onClick={() => addNotification('Pricing rule details not implemented.', 'info')}
                    >
                        <p>Available for all cloth types.</p>
                    </ActionCard>
                </div>

                <div className="detail-actions">
                    <Button variant="danger" onClick={() => addNotification('Rate deletion not implemented.', 'error')}>Delete Rate</Button>
                </div>
            </div>
        </div>
    );
};


// --- List Views (Card Grids) ---
const OrdersListScreen = ({ orders, currentUser, handleCardClick }) => {
    const { addNotification } = useNotifications();
    const role = currentUser.role;
    let filteredOrders = orders;

    if (role === 'Customer') {
        filteredOrders = orders.filter(o => o.customerId === currentUser.id);
    } else if (role === 'Service Provider') {
        filteredOrders = orders.filter(o => o.serviceProviderId === currentUser.id || o.status === 'Created'); // SP can see new orders to accept
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [deliveryOptionFilter, setDeliveryOptionFilter] = useState('All');

    const displayedOrders = filteredOrders.filter(order =>
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.serviceProviderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.items.some(item => item.type.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (statusFilter === 'All' || order.status === statusFilter) &&
        (deliveryOptionFilter === 'All' || order.deliveryOption === deliveryOptionFilter)
    );

    const availableStatuses = [...new Set(filteredOrders.map(o => o.status))];
    const availableDeliveryOptions = [...new Set(filteredOrders.map(o => o.deliveryOption))];

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={() => handleCardClick('Dashboard')} className="back-button"><Icon name="back" /> Back to Dashboard</Button>
                <h2>{role === 'Customer' ? 'My Orders' : 'All Orders'}</h2>
                {role === 'Customer' && <Button variant="primary" onClick={() => handleCardClick('NewOrderForm')}><Icon name="plus" /> New Order</Button>}
            </div>

            <div className="flex gap-md mb-lg">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    {availableStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={deliveryOptionFilter} onChange={(e) => setDeliveryOptionFilter(e.target.value)}>
                    <option value="All">All Delivery Options</option>
                    {availableDeliveryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>

            <div className="card-grid">
                {displayedOrders.length > 0 ? (
                    displayedOrders.map(order => (
                        <ActionCard
                            key={order.id}
                            title={`Order #${order.id}`}
                            meta={`Customer: ${order.customerName} | Total: ${formatCurrency(order.totalPrice)}`}
                            status={order.status}
                            accentType={order.deliveryOption}
                            onClick={() => handleCardClick('OrderDetail', order)}
                        >
                            <p>Items: {order.items.map(i => `${i.qty}x ${i.type}`).join(', ')}</p>
                            <p>Provider: {order.serviceProviderName || 'Unassigned'}</p>
                            {order.sla?.breached && <p style={{color: 'var(--status-red)', fontWeight: 'bold'}}>SLA BREACHED!</p>}
                        </ActionCard>
                    ))
                ) : (
                    <div className="text-center full-width-card">
                        <p>No orders found matching your criteria.</p>
                        {role === 'Customer' && <Button variant="primary" onClick={() => handleCardClick('NewOrderForm')}><Icon name="plus" /> Place Your First Order</Button>}
                    </div>
                )}
            </div>
        </div>
    );
};

const PartnersListScreen = ({ partners, handleCardClick, currentUserRole }) => {
    const { addNotification } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const displayedPartners = partners.filter(partner =>
        (partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         partner.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || partner.status === statusFilter)
    );

    const availableStatuses = [...new Set(partners.map(p => p.status))];

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={() => handleCardClick('Dashboard')} className="back-button"><Icon name="back" /> Back to Dashboard</Button>
                <h2>Service Partners</h2>
                {currentUserRole === 'Admin' && <Button variant="primary" onClick={() => handleCardClick('NewPartnerForm')}><Icon name="plus" /> Add New Partner</Button>}
            </div>

            <div className="flex gap-md mb-lg">
                <input
                    type="text"
                    placeholder="Search partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    {availableStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div className="card-grid">
                {displayedPartners.length > 0 ? (
                    displayedPartners.map(partner => (
                        <ActionCard
                            key={partner.id}
                            title={partner.name}
                            meta={`Email: ${partner.email} | Contact: ${partner.contact}`}
                            status={partner.status}
                            accentType="Partner"
                            onClick={() => handleCardClick('PartnerDetail', partner)}
                        >
                            <p>Address: {partner.address}</p>
                        </ActionCard>
                    ))
                ) : (
                    <p className="text-center full-width-card">No partners found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

const RatesListScreen = ({ rates, handleCardClick, currentUserRole }) => {
    const { addNotification } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');

    const displayedRates = rates.filter(rate =>
        rate.clothType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="screen-container">
            <div className="screen-header">
                <Button variant="secondary" onClick={() => handleCardClick('Dashboard')} className="back-button"><Icon name="back" /> Back to Dashboard</Button>
                <h2>Pricing Rates</h2>
                {currentUserRole === 'Admin' && <Button variant="primary" onClick={() => handleCardClick('NewRateForm')}><Icon name="plus" /> Add New Rate</Button>}
            </div>

            <div className="flex gap-md mb-lg">
                <input
                    type="text"
                    placeholder="Search cloth types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
            </div>

            <div className="card-grid">
                {displayedRates.length > 0 ? (
                    displayedRates.map(rate => (
                        <ActionCard
                            key={rate.id}
                            title={rate.clothType}
                            meta={`Price: ${formatCurrency(rate.price)} ${rate.unit}`}
                            status="Active" // Rates are generally 'Active' if they exist
                            accentType="Rate"
                            onClick={() => handleCardClick('RateDetail', rate)}
                        >
                            <p>Last Updated: {rate.lastUpdated}</p>
                        </ActionCard>
                    ))
                ) : (
                    <p className="text-center full-width-card">No rates found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

// --- Main App Component ---
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'OrdersList', 'OrderDetail', 'NewOrderForm', 'PartnersList', 'RateList' etc.
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [allOrders, setAllOrders] = useState(DUMMY_DATA.orders);
    const [allPartners, setAllPartners] = useState(DUMMY_DATA.partners);
    const [allRates, setAllRates] = useState(DUMMY_DATA.rates);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            const user = DUMMY_DATA.users.find(u => u.role === storedRole);
            if (user) {
                setCurrentUser(user);
            }
        }
        if (localStorage.getItem('darkMode') === 'true') {
            setDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', !darkMode);
    };

    const login = (role) => {
        const user = DUMMY_DATA.users.find(u => u.role === role);
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('userRole', role);
            setCurrentScreen('dashboard');
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('userRole');
        setCurrentScreen('login');
    };

    const handleCardClick = (screenName, record = null, optionalParam = null) => {
        setSelectedRecord(record);
        setCurrentScreen(screenName);
    };

    const goBack = () => {
        setCurrentScreen('dashboard'); // Simple back to dashboard for this prototype
        setSelectedRecord(null);
    };

    const updateOrder = (updatedOrder) => {
        setAllOrders(prevOrders =>
            prevOrders.map(order => (order.id === updatedOrder.id ? updatedOrder : order))
        );
        setSelectedRecord(updatedOrder); // Keep the updated record in detail view
    };

    const addNewOrder = (newOrderData) => {
        const newOrder = {
            ...newOrderData,
            id: `ord-${generateUUID().substring(0, 5)}`,
            createdDate: new Date().toISOString(),
            status: 'Created', // Always start as 'Created'
            totalPrice: newOrderData.items.reduce((sum, item) => sum + (item.qty * item.pricePer), 0),
            sla: { currentStage: 'Created', due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), breached: false }
        };
        setAllOrders(prev => [...prev, newOrder]);
        handleCardClick('OrderDetail', newOrder);
    };

    const addNewPartner = (newPartnerData) => {
        const newPartner = {
            ...newPartnerData,
            id: `ptr-${generateUUID().substring(0, 5)}`,
            status: 'Pending Approval' // Always start as pending
        };
        setAllPartners(prev => [...prev, newPartner]);
        handleCardClick('PartnersList');
    };

    const addNewRate = (newRateData) => {
        const newRate = {
            ...newRateData,
            id: `rate-${generateUUID().substring(0, 5)}`,
            lastUpdated: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        };
        setAllRates(prev => [...prev, newRate]);
        handleCardClick('RatesList');
    };

    if (!currentUser) {
        return (
            <div className="login-screen">
                <div className="login-card">
                    <h2 className="mb-lg">IronEclipse</h2>
                    <p className="mb-xl">Select your role to continue:</p>
                    <div className="role-selection">
                        <Button variant="primary" onClick={() => login('Admin')}>Login as Admin</Button>
                        <Button variant="primary" onClick={() => login('Customer')}>Login as Customer</Button>
                        <Button variant="primary" onClick={() => login('Service Provider')}>Login as Service Provider</Button>
                    </div>
                </div>
            </div>
        );
    }

    const renderMainContent = () => {
        switch (currentScreen) {
            case 'dashboard':
                if (currentUser.role === 'Admin') return <AdminDashboard orders={allOrders} partners={allPartners} handleCardClick={handleCardClick} />;
                if (currentUser.role === 'Customer') return <CustomerDashboard orders={allOrders} currentUser={currentUser} handleCardClick={handleCardClick} />;
                if (currentUser.role === 'Service Provider') return <ServiceProviderDashboard orders={allOrders} currentUser={currentUser} handleCardClick={handleCardClick} />;
                return <p className="text-center">Welcome! Select an option from the sidebar.</p>;

            // Orders related screens
            case 'OrdersList':
            case 'OrdersQueue': // SP might have a specific "queue" view, but for prototype, it's just a filtered list
                return <OrdersListScreen orders={allOrders} currentUser={currentUser} handleCardClick={handleCardClick} />;
            case 'OrderDetail':
                if (selectedRecord && (
                    currentUser.role === 'Admin' ||
                    (currentUser.role === 'Customer' && selectedRecord.customerId === currentUser.id) ||
                    (currentUser.role === 'Service Provider' && selectedRecord.serviceProviderId === currentUser.id)
                )) {
                    return <OrderDetailScreen order={selectedRecord} goBack={goBack} updateOrder={updateOrder} currentUserId={currentUser.id} currentUserRole={currentUser.role} />;
                }
                return <p className="text-center">Access Denied or Order not found.</p>;
            case 'NewOrderForm':
                if (currentUser.role === 'Customer' || currentUser.role === 'Admin') {
                    return <OrderForm onSubmit={addNewOrder} onCancel={goBack} customerId={currentUser.id} customerName={currentUser.name} partners={allPartners} rates={allRates} />;
                }
                return <p className="text-center">Access Denied to create orders.</p>;
            case 'EditOrderForm':
                if (selectedRecord && (
                    currentUser.role === 'Admin' ||
                    (currentUser.role === 'Service Provider' && selectedRecord.serviceProviderId === currentUser.id)
                )) {
                    return <OrderForm order={selectedRecord} onSubmit={updateOrder} onCancel={() => handleCardClick('OrderDetail', selectedRecord)} partners={allPartners} rates={allRates} />;
                }
                return <p className="text-center">Access Denied to edit this order.</p>;

            // Partners related screens
            case 'PartnersList':
                if (currentUser.role === 'Admin') {
                    return <PartnersListScreen partners={allPartners} handleCardClick={handleCardClick} currentUserRole={currentUser.role} />;
                }
                return <p className="text-center">Access Denied.</p>;
            case 'PartnerDetail':
                if (currentUser.role === 'Admin' && selectedRecord) {
                    return <PartnerDetailScreen partner={selectedRecord} goBack={goBack} updatePartner={() => {}} />;
                }
                return <p className="text-center">Access Denied or Partner not found.</p>;
            case 'NewPartnerForm':
                if (currentUser.role === 'Admin') {
                    return <PartnerForm onSubmit={addNewPartner} onCancel={goBack} />;
                }
                return <p className="text-center">Access Denied.</p>;

            // Rates related screens
            case 'RatesList':
                if (currentUser.role === 'Admin') {
                    return <RatesListScreen rates={allRates} handleCardClick={handleCardClick} currentUserRole={currentUser.role} />;
                }
                return <p className="text-center">Access Denied.</p>;
            case 'RateDetail':
                if (currentUser.role === 'Admin' && selectedRecord) {
                    return <RateDetailScreen rate={selectedRecord} goBack={goBack} updateRate={() => {}} />;
                }
                return <p className="text-center">Access Denied or Rate not found.</p>;
            case 'NewRateForm':
                if (currentUser.role === 'Admin') {
                    return <RateForm onSubmit={addNewRate} onCancel={goBack} />;
                }
                return <p className="text-center">Access Denied.</p>;

            // Default fallback
            default:
                return <p className="text-center">Screen not found.</p>;
        }
    };

    return (
        <NotificationProvider>
            <div className="app">
                <aside className="sidebar">
                    <h2>IronEclipse</h2>
                    <nav>
                        <ul>
                            {['Admin', 'Customer', 'Service Provider'].includes(currentUser.role) && (
                                <li>
                                    <Button
                                        onClick={() => handleCardClick('dashboard')}
                                        className={currentScreen === 'dashboard' ? 'active' : ''}
                                    >
                                        <Icon name="dashboard" className="icon-light" /> Dashboard
                                    </Button>
                                </li>
                            )}

                            {(currentUser.role === 'Customer') && (
                                <li>
                                    <Button
                                        onClick={() => handleCardClick('OrdersList')}
                                        className={currentScreen === 'OrdersList' && selectedRecord === null ? 'active' : ''}
                                    >
                                        <Icon name="orders" className="icon-light" /> My Orders
                                    </Button>
                                </li>
                            )}

                            {(currentUser.role === 'Service Provider') && (
                                <li>
                                    <Button
                                        onClick={() => handleCardClick('OrdersQueue')}
                                        className={currentScreen === 'OrdersQueue' ? 'active' : ''}
                                    >
                                        <Icon name="orders" className="icon-light" /> My Orders Queue
                                    </Button>
                                </li>
                            )}

                            {(currentUser.role === 'Admin') && (
                                <>
                                    <li>
                                        <Button
                                            onClick={() => handleCardClick('OrdersList')}
                                            className={currentScreen === 'OrdersList' ? 'active' : ''}
                                        >
                                            <Icon name="orders" className="icon-light" /> All Orders
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={() => handleCardClick('PartnersList')}
                                            className={currentScreen === 'PartnersList' ? 'active' : ''}
                                        >
                                            <Icon name="partners" className="icon-light" /> Partners
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={() => handleCardClick('RatesList')}
                                            className={currentScreen === 'RatesList' ? 'active' : ''}
                                        >
                                            <Icon name="rates" className="icon-light" /> Rates
                                        </Button>
                                    </li>
                                </>
                            )}
                            <li>
                                <Button onClick={logout} variant="secondary" className="mt-xl">
                                    <Icon name="user" className="icon-light" /> Logout ({currentUser.role})
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="main-content">
                    <header className="header">
                        <h1>IronEclipse</h1>
                        <div className="user-info">
                            <span>Welcome, {currentUser.name}! ({currentUser.role})</span>
                            <div className="avatar">{currentUser.name.charAt(0)}</div>
                            <Button onClick={toggleDarkMode} variant="secondary" className="dark-mode-toggle">
                                {darkMode ? <Icon name="sun" className="icon-dark" /> : <Icon name="moon" className="icon-light" />}
                            </Button>
                        </div>
                    </header>
                    {renderMainContent()}
                </main>
                <NotificationSystem />
            </div>
        </NotificationProvider>
    );
}

export default App;