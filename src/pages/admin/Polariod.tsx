import { useState } from "react";
import AdminPrintLayout from "../../components/ui/AdminPrintLayout";
import FilterModal from "../../components/Modals/FilterModal";

const AdminPolariodList = () => {
    const [showFiltermodal, setShowFiltermodal] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const handleFilterChange = (filters: string[]) => {
        setActiveFilters(filters);
    };

    return (
        <div>
            <AdminPrintLayout type="Postcard" setShowFiltermodal={setShowFiltermodal} activeFilters={activeFilters} />
            <div>
                <FilterModal showFiltermodal={showFiltermodal} onClose={() => setShowFiltermodal(false)} onFilterChange={handleFilterChange} />
            </div>
        </div>
    );
}

export default AdminPolariodList