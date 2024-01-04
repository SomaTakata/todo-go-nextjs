import { ENDPOINT } from "@/app/page";

export async function sendUserIdToBackend(userId:string|undefined, username:string|undefined|null) {
    if (!userId) {
        console.error('User ID is undefined');
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/api/save-user-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, username })
        });

        if (!response.ok) {
            throw new Error('Failed to send user ID');
        }

        // レスポンスデータをJSON形式で取得
        const updated = await response.json();

        // 必要に応じて追加の処理を行う
        // 例えば、ローカルの状態を更新する、通知を表示するなど

    } catch (error) {
        console.error('Error:', error);
    }
}
