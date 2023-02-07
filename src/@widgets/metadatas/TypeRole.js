const TypeRole = {
    Admin:      {id: "Admin",   name: "Admin",      level: 1, className: "bg-blue-700 text-white"},
    Manager:    {id: "Manager", name: "Manager",    level: 2, className: "bg-green-700 text-white"},
    Lead:       {id: "Lead",    name: "Lead",       level: 3, className: "bg-orange-700 text-white"},
    Staff:      {id: "Staff",   name: "Staff",      level: 4, className: "bg-gray-700 text-white"}
}

export const getTypeRole = type => {
    return Object.values(TypeRole).find(item=>item.id === type)
}

export default TypeRole