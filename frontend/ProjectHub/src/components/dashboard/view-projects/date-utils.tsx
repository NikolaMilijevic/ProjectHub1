export const formatDate = (date?: string, withTime = false) =>
	date
		? new Date(date)[withTime ? "toLocaleString" : "toLocaleDateString"](
				"en-US",
				{
					year: "numeric",
					month: "short",
					day: "numeric",
				}
		  )
		: "N/A";
