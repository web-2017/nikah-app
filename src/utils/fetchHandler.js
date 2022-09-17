class FetchClass {
	#headerOptions = { 'Content-Type': 'application/json' }
	async logIn({ url, data }) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: this.#headerOptions,
				body: JSON.stringify(data),
			})

			const resp = await response.json()
			return resp
		} catch (error) {
			console.error(error.cause)
		}
	}

	async createProfile({ url, body, token }) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			})
			const resp = await response.json()

			return resp
		} catch (error) {
			console.error(error)
		}
	}

	async getByIdDataHandler({ url, userId, token }) {
		try {
			const response = await fetch(`${url}/${userId}`, {
				method: 'GET',
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			const resp = await response.json()
			return resp
		} catch (error) {
			console.error(error.cause)
		}
	}
	async getAllDataHandler({ url, token }) {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			const resp = await response.json()
			return resp
		} catch (error) {
			console.error(error.cause)
		}
	}

	async editProfile({ url, token, body }) {
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					...this.#headerOptions,
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			})

			const resp = await response.json()

			return resp
		} catch (error) {
			console.error(error)
		}
	}

	async editUser({ url, token, body }) {
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					...this.#headerOptions,
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			})

			const resp = await response.json()

			return resp
		} catch (error) {
			throw new Error('Error edit user', { cause: error })
			console.error(error.cause)
		}
	}
}

const fetchHandler = new FetchClass()

export default fetchHandler
