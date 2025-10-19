import toast from "react-hot-toast";
import axiosInstance from "../axios/axios";
import endpoints from "../constants/endpoints";
import usePinnedMessages from "../hooks/usePinnedMessages";
import useChannelStore from "../zustand/useChannelStore";

function PinnedMessagesModal({ onClose }) {

    const roomId = useChannelStore((state) => state.selectedChannel?.id);
    const { pinnedMessages, loading, error } = usePinnedMessages(roomId);

    const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

    //API: Unpin message
    const handleUnpinMessage = (messageId) => {
        axiosInstance.post(endpoints?.UNPIN_MESSAGE, { messageId })
        .then(resp => toast.success("Unpin sucessful"))
        .catch(err => toast.error("Failed to unpin message"));
    }

    return (
        <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-md shadow-lg max-h-[80vh] overflow-y-auto border">
                
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-2 border-b">
                <h2 className="text-base font-semibold">📌 Pinned Messages</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black text-lg font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                </div>

                {/* Body */}
                <div className="p-3 space-y-3 text-sm">
                {loading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : pinnedMessages.length === 0 ? (
                    <div className="text-gray-500">No pinned messages in this channel.</div>
                ) : (
                    pinnedMessages.map((msg) => (
                    <div key={msg._id} className="border rounded px-3 py-2 bg-gray-50 shadow-sm">
                        <div className="text-gray-800 font-medium">
                            {msg.u?.username || 'Unknown'}
                        </div>
                        <div className="text-gray-700 mt-1">{msg.msg}</div>
                        <div className="text-[11px] text-gray-500 mt-1">
                            Posted on {formatTimestamp(msg.ts)}
                        </div>
                        <button
                            onClick={() => handleUnpinMessage(msg._id)}
                            className="text-xs text-red-600 hover:underline mt-1"
                        >
                        Unpin
                        </button>
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
    );
}

export default PinnedMessagesModal;
