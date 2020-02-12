export const swaggerDocument = () => ({
	swagger: '2.0',
	info: {
		version: '1.0',
		title: 'Tajawal Hotel App',
		description: 'Tajawal Hotel Service',
		contact: {}
	},
	host: 'localhost:8000',
	basePath: '',
	schemes: [
		'http',
		'https'
	],
	consumes: [
		'application/json'
	],
	produces: [
		'application/json'
	],
	paths: {
		'/hotels': {
			post: {
				description: 'Save hotel',
				summary: 'Save hotel details',
				tags: [
					'Hotel'
				],
				operationId: 'add',
				produces: [
					'application/json; charset=utf-8'
				],
				parameters: [
					{
						name: 'Body',
						in: 'body',
						required: true,
						description: 'Hotel to be saved',
						schema: {
							$ref: '#/definitions/Hotel'
						}
					}
				],
				responses: {
					200: {
						description: 'Save Hotel Response',
						schema: {
							$ref: '#/definitions/SavedHotel'
						},
						examples: {
							'application/json; charset=utf-8': {
								name: 'Media One Hotel',
								price: 500,
								city: 'dubai',
								availability: [
									{
										from: '2020-10-10T11:12:23.000Z',
										to: '2020-10-15T11:12:23.000Z'
									},
									{
										from: '2020-10-25T11:12:23.000Z',
										to: '2020-10-30T11:12:23.000Z'
									},
									{
										from: '2020-11-05T11:12:23.000Z',
										to: '2020-11-17T11:12:23.000Z'
									}
								]
							}

						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: 'string',
								default: '*'
							},
							'Access-Control-Allow-Methods': {
								type: 'string',
								default: 'GET,PUT,POST,DELETE,OPTIONS'
							},
							'Access-Control-Allow-Headers': {
								type: 'string',
								default: 'Content-type,Accept,X-Access-Token,X-Key'
							},
							'Content-Length': {
								type: 'string',
								default: '290'
							},
							'ETag': {
								type: 'string',
								default: 'W/"122-IN/X0bOZ5K3Mtk+OGNpwkgfeEDk"'
							},
							'Date': {
								type: 'string',
								default: 'Tue, 12 Feb 2020 13:05:01 GMT'
							},
							'Connection': {
								type: 'string',
								default: 'keep-alive'
							}
						}
					}
				}
			},
			put: {
				description: 'Update hotel',
				summary: 'Update hotel details',
				tags: [
					'Hotel'
				],
				operationId: 'update',
				produces: [
					'application/json; charset=utf-8'
				],
				parameters: [
					{
						name: 'Body',
						in: 'body',
						required: true,
						description: 'Hotel to be updated',
						schema: {
							$ref: '#/definitions/UpdateHotel'
						}
					}
				],
				responses: {
					200: {
						description: 'Update Hotel Response',
						schema: {
							$ref: '#/definitions/UpdatedHotel'
						},
						examples: {
							'application/json; charset=utf-8': {
								n: 1,
								nModified: 1,
								ok: 1
							}

						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: 'string',
								default: '*'
							},
							'Access-Control-Allow-Methods': {
								type: 'string',
								default: 'GET,PUT,POST,DELETE,OPTIONS'
							},
							'Access-Control-Allow-Headers': {
								type: 'string',
								default: 'Content-type,Accept,X-Access-Token,X-Key'
							},
							'Content-Length': {
								type: 'string',
								default: '290'
							},
							'ETag': {
								type: 'string',
								default: 'W/"122-IN/X0bOZ5K3Mtk+OGNpwkgfeEDk"'
							},
							'Date': {
								type: 'string',
								default: 'Tue, 12 Feb 2020 13:05:01 GMT'
							},
							'Connection': {
								type: 'string',
								default: 'keep-alive'
							}
						}
					}
				}
			},
			get: {
				description: 'Get all hotels',
				summary: 'Get all saved hotels',
				tags: [
					'Hotel'
				],
				operationId: 'list',
				produces: [
					'application/json; charset=utf-8'
				],
				parameters: [
					{
						name: 'name',
						in: 'query',
						required: false,
						description: 'name of hotel'
					},
					{
						name: 'price',
						in: 'query',
						required: false,
						description: 'price range'
					},
					{
						name: 'city',
						in: 'query',
						required: false,
						description: 'city of location for a hotel'
					},
					{
						name: 'availableFrom',
						in: 'query',
						required: false,
						description: 'Available from date'
					},
					{
						name: 'availableTo',
						in: 'query',
						required: false,
						description: 'Available to date'
					},
					{
						name: 'sortBy',
						in: 'query',
						required: false,
						description: 'Sort by'
					},
					{
						name: 'orderBy',
						in: 'query',
						required: false,
						description: 'Sort order'
					},
					{
						name: 'index',
						in: 'query',
						required: false,
						description: 'skip number of records'
					},
					{
						name: 'size',
						in: 'query',
						required: false,
						description: 'Number of records per page'
					}
				],
				responses: {
					200: {
						description: 'Get all hotels response',
						schema: {
							type: 'array',
							items: {
								type: 'object',
								$ref: '#/definitions/SavedHotel'
							}
						},
						examples: {
							'application/json; charset=utf-8': [
								{
									name: "Media One Hotel",
									price: 102.2,
									city: "dubai",
									availability: [
										{
											from: "2020-10-10T11:12:23.000Z",
											to: "2020-10-15T11:12:23.000Z"
										},
										{
											from: "2020-10-16T11:12:23.000Z",
											to: "2020-10-21T11:12:23.000Z"
										},
										{
											from: "2020-10-24T11:12:23.000Z",
											to: "2020-10-29T11:12:23.000Z"
										}
									]
								},
								{
									name: "Rotana Hotel",
									price: 80.6,
									city: "cairo",
									availability: [
										{
											from: "2020-09-10T11:12:23.000Z",
											to: "2020-09-15T11:12:23.000Z"
										},
										{
											from: "2020-09-16T11:12:23.000Z",
											to: "2020-09-21T11:12:23.000Z"
										},
										{
											from: "2020-09-24T11:12:23.000Z",
											to: "2020-09-29T11:12:23.000Z"
										}
									]
								},
								{
									name: "Le Meridien",
									price: 89.6,
									city: "london",
									availability: [
										{
											from: "2020-10-10T11:12:23.000Z",
											to: "2020-10-15T11:12:23.000Z"
										},
										{
											from: "2020-10-16T11:12:23.000Z",
											to: "2020-10-21T11:12:23.000Z"
										},
										{
											from: "2020-11-24T11:12:23.000Z",
											to: "2020-12-29T11:12:23.000Z"
										}
									]
								}
							]

						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: 'string',
								default: '*'
							},
							'Access-Control-Allow-Methods': {
								type: 'string',
								default: 'GET,PUT,POST,DELETE,OPTIONS'
							},
							'Access-Control-Allow-Headers': {
								type: 'string',
								default: 'Content-type,Accept,X-Access-Token,X-Key'
							},
							'Content-Length': {
								type: 'string',
								default: '290'
							},
							'ETag': {
								type: 'string',
								default: 'W/"122-IN/X0bOZ5K3Mtk+OGNpwkgfeEDk"'
							},
							'Date': {
								type: 'string',
								default: 'Tue, 12 Feb 2020 13:05:01 GMT'
							},
							'Connection': {
								type: 'string',
								default: 'keep-alive'
							}
						}
					}
				}
			}
		},
		'/hotels/{id}': {
			get: {
				description: 'Get hotel by id',
				summary: 'Get hotel by id',
				tags: [
					'Hotel'
				],
				operationId: 'get',
				produces: [
					'application/json; charset=utf-8'
				],
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						description: 'hotel id'
					}
				],
				responses: {
					200: {
						description: 'Get Hotel Response',
						schema: {
							$ref: '#/definitions/SavedHotel'
						},
						examples: {
							'application/json; charset=utf-8': {
								_id: "5e43b1a3e112ec0461f766c5",
								name: "Rotana Hotel",
								price: 80.6,
								city: "cairo",
								availability: [
									{
										from: "2020-10-05T11:12:23.000Z",
										to: "2020-10-10T11:12:23.000Z"
									},
									{
										from: "2020-10-20T11:12:23.000Z",
										to: "2020-10-25T11:12:23.000Z"
									},
									{
										from: "2020-11-05T11:12:23.000Z",
										to: "2020-11-15T11:12:23.000Z"
									}
								],
								__v : 0
							}

						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: 'string',
								default: '*'
							},
							'Access-Control-Allow-Methods': {
								type: 'string',
								default: 'GET,PUT,POST,DELETE,OPTIONS'
							},
							'Access-Control-Allow-Headers': {
								type: 'string',
								default: 'Content-type,Accept,X-Access-Token,X-Key'
							},
							'Content-Length': {
								type: 'string',
								default: '290'
							},
							'ETag': {
								type: 'string',
								default: 'W/"122-IN/X0bOZ5K3Mtk+OGNpwkgfeEDk"'
							},
							'Date': {
								type: 'string',
								default: 'Tue, 12 Feb 2020 13:05:01 GMT'
							},
							'Connection': {
								type: 'string',
								default: 'keep-alive'
							}
						}
					}
				}
			},
			delete: {
				description: 'Delete hotel by id',
				summary: 'Delete hotel by id',
				tags: [
					'Hotel'
				],
				operationId: 'delete',
				produces: [
					'application/json; charset=utf-8'
				],
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						description: 'hotel id to delete'
					}
				],
				responses: {
					200: {
						description: 'Delete Hotel Response',
						schema: {
							$ref: '#/definitions/DeletedHotel'
						},
						examples: {
							'application/json; charset=utf-8': {
								n: 1,
								ok: 1,
								deletedCount: 1
							}

						},
						headers: {
							'Access-Control-Allow-Origin': {
								type: 'string',
								default: '*'
							},
							'Access-Control-Allow-Methods': {
								type: 'string',
								default: 'GET,PUT,POST,DELETE,OPTIONS'
							},
							'Access-Control-Allow-Headers': {
								type: 'string',
								default: 'Content-type,Accept,X-Access-Token,X-Key'
							},
							'Content-Length': {
								type: 'string',
								default: '290'
							},
							'ETag': {
								type: 'string',
								default: 'W/"122-IN/X0bOZ5K3Mtk+OGNpwkgfeEDk"'
							},
							'Date': {
								type: 'string',
								default: 'Tue, 12 Feb 2020 13:05:01 GMT'
							},
							'Connection': {
								type: 'string',
								default: 'keep-alive'
							}
						}
					}
				},
				security: [
					{
						token: []
					}
				]
			}
		}
	},
	definitions: {
		Hotel: {
			title: 'SaveHotelRequest',
			example: {
				name: "Hotel Grand Hyatt",
				price: 500,
				city: "Dubai",
				availability: [
					{
						from: "2020-10-05T11:12:23.000Z",
						to: "2020-10-10T11:12:23.000Z"
					},
					{
						from: "2020-10-15T11:12:23.000Z",
						to: "2020-10-25T11:12:23.000Z"
					},
				]
			},
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				price: {
					type: 'number'
				},
				city: {
					type: 'string'
				},
				availability: {
					type: 'array',
					items: {
						$ref: '#/definitions/Availability'
					}
				}
			},
			required: [
				'name',
				'price',
				'city',
				'availability'
			]
		},
		UpdateHotel: {
			title: 'UpdateHotelRequest',
			example: {
				_id: "5e43b1a3e112ec0461f766b3",
				name: "Hotel Grand Hyatt",
				price: 700,
				city: "Dubai",
				availability: [
					{
						from: "2020-10-05T11:12:23.000Z",
						to: "2020-10-10T11:12:23.000Z"
					},
					{
						from: "2020-10-15T11:12:23.000Z",
						to: "2020-10-25T11:12:23.000Z"
					}
				]
			},
			type: 'object',
			properties: {
				id: {
					type: 'string'
				},
				name: {
					type: 'string'
				},
				price: {
					type: 'number'
				},
				city: {
					type: 'string'
				},
				availability: {
					type: 'array',
					items: {
						$ref: '#/definitions/Availability'
					}
				}
			},
			required: [
				'id',
				'name',
				'price',
				'city',
				'availability'
			]
		},
		SavedHotel: {
			title: 'SavedMilestoneResponse',
			example: {
				_id: "5e43b1a3e112ec0461f766b3",
				name: "Media One Hotel",
				price: 500,
				city: "dubai",
				availability: [
					{
						from: "2020-09-12T11:12:23.000Z",
						to: "2020-09-16T11:12:23.000Z"
					},
					{
						from: "2020-09-25T11:12:23.000Z",
						to: "2020-10-01T11:12:23.000Z"
					},
					{
						from: "2020-10-05T11:12:23.000Z",
						to: "2020-10-10T11:12:23.000Z"
					}
				],
				__v: 0
			},
			type: 'object',
			properties: {
				id: {
					type: 'string'
				},
				name: {
					type: 'string'
				},
				price: {
					type: 'number'
				},
				city: {
					type: 'string'
				},
				availability: {
					type: 'array',
					items: {
						$ref: '#/definitions/Availability'
					}
				},
				__v: {
					type: 'integer',
					format: 'int32'
				}
			},
			required: [
				'name',
				'price',
				'city',
				'availability',
				'__v'
			]
		},
		Availability: {
			title: 'Availability',
			example: {
				from: '2020-10-10T11:12:23.000Z',
				to: '2020-10-15T11:12:23.000Z'
			},
			type: 'object',
			properties: {
				from: {
					example: "2020-10-10T11:12:23.000Z",
					type: 'date'
				},
				to: {
					example: '2020-10-15T11:12:23.000Z',
					type: 'date'
				}
			},
			required: [
				'from',
				'to'
			]
		},
		UpdatedHotel : {
			title: 'UpdatedHotelResponse',
			example: {
				n: 1,
				nModified: 1,
				ok: 1
			},
			type: 'object',
			properties: {
				n: {
					type: 'number'
				},
				nModified: {
					type: 'number'
				},
				ok: {
					type: 'number'
				}
			},
			required: [
				'n',
				'nModified',
				'ok'
			]
		},
		DeletedHotel: {
			title: 'DeletedHotelResponse',
			example: {
				n: 1,
				ok: 1,
				deletedCount: 1
			},
			type: 'object',
			properties: {
				n: {
					type: 'number'
				},
				ok: {
					type: 'number'
				},
				deletedCount: {
					type: 'number'
				}
			},
			required: [
				'n',
				'ok',
				'deletedCount'
			]
		},
	},
	tags: [
		{
			name: 'Tajawal Hotel API',
			description: 'Store and process hotel details based on name, city, price and availability'
		}
	]
});
