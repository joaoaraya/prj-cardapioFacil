/* Importar estilo */
import '../styles/components/barSearch.css';

export function BarSearch({ searchQuery, setSearchQuery }: any) {
    return (
        <input className="barSearch" type="search" placeholder="Procure..." value={searchQuery} onInput={txt => setSearchQuery((txt.target as HTMLTextAreaElement).value)} />
    )
}