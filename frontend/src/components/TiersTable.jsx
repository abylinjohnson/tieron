const TiersTable = ({ tierons }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tierons.map((e) => {
                        return (<tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {e.name}
                            </th>
                            <td className="px-6 py-4">
                                {e.category}
                            </td>
                            <td className="px-6 py-4">
                                {e.id}
                            </td>
                            <td className="px-6 py-4">
                                {e.status}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default TiersTable