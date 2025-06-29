import { useState } from "react";
import FilterModal from "../../components/modals/FilterModal";
import AdminPrintLayout from "../../components/ui/AdminPrintLayout";

const AdminPostCardList = () => {
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

export default AdminPostCardList